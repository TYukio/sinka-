var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var chalk = require('chalk');
var jwt = require('jsonwebtoken');
var dbconnection = require('../../util/dbconnection');
var multerUpload = require('../../util/multerstorage');
var jimp = require('jimp');

/* GET all data from all courts */
router.get('/fetchall', function(req, res, next) {
    dbconnection.then(conn => {
        conn.query('SELECT * FROM `sportcourt`;').then(rows => {
            return res.status(200).json(rows);
        });
    });
});

/* POST new courtdata */
router.post('/create', multerUpload.single('avatar'), function(req, res, next) {
    var decodedToken = null;
    var form = req.body;

    console.log(chalk.green('Criação') + ' solicitada para local esportivo');

    try {
        decodedToken = jwt.verify(req.cookies['token'], process.env.DB_PASS);
    }
    catch (err) {
        console.log(chalk.redBright('FALHA TOKEN USUÁRIO'));
        return res.sendStatus(400);
    }

    // TODO: Validar tipo de usuário

    dbconnection.then(conn => {
        conn.query('INSERT INTO `sportcourt` (`id_owner`, `id_sport`, `title`, `subtitle`, `addressname`) VALUES (?, ?, ?, ?, ?);', 
            [decodedToken.uid, form.sport, form.title, form.subtitle, form.address]).then(rows => {
            if (rows.affectedRows > 0 )
            {
                if (req.file !== undefined)
                {
                    jimp.read(req.file.path)
                    .then(image => {
                        image.resize(1024, 500).quality(75).write(path.join(__dirname, '..', '..', 'public', 'images', 'court', rows.insertId.toString() + '.jpg'));
                        fs.unlinkSync(req.file.path);
                    })
                }

                res.status(200).send(rows.insertId.toString());
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

/* DELETE court data */
router.delete('/delete', function(req, res, next) {

    var decodedToken = null;
    var form = req.body;

    console.log(chalk.red('Remoção') + ' solicitada para local esportivo de ID #' + form.id_court);

    try {
        decodedToken = jwt.verify(req.cookies['token'], process.env.DB_PASS);
    }
    catch (err) {
        console.log(chalk.redBright('FALHA TOKEN USUÁRIO'));
        return res.sendStatus(400);
    }

    dbconnection.then(conn => {
        conn.query('SELECT `id_owner` FROM `sportcourt` WHERE `id` = ?;', [form.id_court]).then(rows => { 
            if (rows.length == 0)
            {
                res.sendStatus(400);
                console.log(chalk.redBright('TIME INEXISTENTE'));
            }
            else if (rows[0].id_owner !== decodedToken.uid)
            {
                res.sendStatus(401);
                console.log(chalk.redBright('NÃO AUTORIZADO'));
            }  
            else
            {
                fs.unlink(path.join(__dirname, '..', '..', 'public', 'images', 'court', form.id_court.toString() + '.jpg'), (err) => {});
                conn.query('DELETE FROM `sportcourt` WHERE `id` = ?;', [form.id_court]).then(rows_a => {
                    if (rows_a.affectedRows > 0 )
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
            }
        })
    });
});

module.exports = router;