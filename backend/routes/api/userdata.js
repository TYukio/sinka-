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

    process.stdout.write(chalk.greenBright('Dados') + ' de ID #' + chalk.bold(id) + ' solicitados na plataforma: ');

    dbconnection.then(conn => {
        conn.query('SELECT `creation`, `gender`, `full_name`, `biography` FROM `person` WHERE `id` = ?;', [id]).then(rows => {
            if (rows.length > 0)
            {
                console.log(chalk.greenBright('SUCESSO'));
                return res.status(200).json(rows[0]);
            }
            else
            {
                console.log(chalk.yellowBright('ID INVALIDO'));
                return res.sendStatus(404);
            }
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

module.exports = router;