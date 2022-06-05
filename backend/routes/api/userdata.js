var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var chalk = require('chalk');
var jwt = require('jsonwebtoken');
var dbconnection = require('../../util/dbconnection');
var multerUpload = require('../../util/multerstorage');
var jimp = require('jimp');

/* GET public user data */
router.get('/fetchpublic', function(req, res, next) {

    if (req.query.id === undefined)
        return res.sendStatus(400);

    id = parseInt(req.query.id)

    dbconnection.then(conn => {
        conn.query('SELECT `creation`, `gender`, `full_name`, `biography` FROM `person` WHERE `id` = ?;', [id]).then(rows => {
            if (rows.length > 0)
            {
                conn.query('SELECT `id_persontype` FROM `person_persontype` WHERE `id_person` = ?;', [id]).then(rows_a => {
                    var persontypes = [];
                    for (const key in rows_a)
                        if (rows_a[key].id_persontype)
                            persontypes.push(rows_a[key].id_persontype);

                        conn.query('SELECT `id_sport` FROM `person_sport` WHERE `id_person` = ?;', [id]).then(rows_b => {
                            var usersports = [];
                            for (const key in rows_b)
                                if (rows_b[key].id_sport)
                                    usersports.push(rows_b[key].id_sport);

                            return res.status(200).json({...rows[0], types: persontypes, sports: usersports});
                        });
                    
                });
            }
            else
                return res.sendStatus(404);
        })
    });

});

/* PATCH existing user data */
router.patch('/update', multerUpload.single('avatar'), function(req, res, next) {

    var decodedToken = null;

    process.stdout.write(chalk.magentaBright('Edição') + ' solicitada para perfil ');

    try {
        decodedToken = jwt.verify(req.cookies['token'], process.env.DB_PASS);
    }
    catch (err) {
        console.log(chalk.redBright('NÃO EXISTENTE'));
        return res.sendStatus(401);
    }

    process.stdout.write('de ID #' + decodedToken.uid + ': ');

    if (req.file !== undefined)
    {
        jimp.read(req.file.path)
        .then(image => {
            image.resize(256, 256).quality(75).write(path.join(__dirname, '..', '..', 'public', 'images', 'pfp', decodedToken.uid + '.jpg'));
            fs.unlinkSync(req.file.path);
        })
    }
    var form = req.body;

    dbconnection.then(conn => {
        conn.query('UPDATE `person` SET `full_name` = ?, `biography` = ? WHERE `id` = ?;', 
            [form.name, form.biography === '' ? null : form.biography, decodedToken.uid]).then(rows => {
            if (rows.affectedRows > 0 )
            {
                // Totamente ridículo
                var persontypes = form.types.split(',');
                var usersports = form.sports.split(',');

                conn.query('DELETE FROM `person_persontype` WHERE `id_person` = ?;', [decodedToken.uid]);
                conn.query('DELETE FROM `person_sport` WHERE `id_person` = ?;', [decodedToken.uid]);

                for (var index in persontypes)
                    if (!isNaN(parseInt(persontypes[index])))
                        conn.query('INSERT INTO `person_persontype` VALUES (?, ?);', [decodedToken.uid, persontypes[index]]);

                for (var index in usersports)
                    if (!isNaN(parseInt(usersports[index])))
                        conn.query('INSERT INTO `person_sport` VALUES (?, ?);', [decodedToken.uid, usersports[index]]);       

                res.sendStatus(200);
                console.log(chalk.greenBright('SUCESSO'));
            }  
            else
            {
                res.sendStatus(500);
                console.log(chalk.redBright('ERRO SQL'));
            }
        });
    });
});

/* GET all teams a user id is part of */
router.get('/teams', function(req, res, next) {

    if (req.query.id === undefined)
        return res.sendStatus(400);

    id = parseInt(req.query.id)

    dbconnection.then(conn => {
        conn.query('SELECT `id`, `title`, `id_sport`, `joined` FROM `person_team`, `team` WHERE `person_team`.`id_team` = `team`.`id` AND `person_team`.`id_person` = ?;', [id]).then(rows => {
            res.status(200).json(rows);
        });
    });

});

module.exports = router;