var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var chalk = require('chalk');
var jwt = require('jsonwebtoken');
var dbconnection = require('../../util/dbconnection');
var multerUpload = require('../../util/multerstorage');
var jimp = require('jimp');

/* GET simplified public team data from all teams */
router.get('/fetchall', function(req, res, next) {
    dbconnection.then(conn => {
        conn.query('SELECT `id`, `id_sport`, `title`, `gender` FROM `team`;').then(rows => {
            let selects = [];

            for (let i = 0; i < rows.length; ++i) {
                selects.push(new Promise(function(resolve, reject) {
                    conn.query('SELECT `id_person`, `coach`, `full_name` FROM `person_team`, `person` WHERE `id_person` = `person`.id AND `id_team` = ?;', [rows[i].id]).then(rows_a => {
                        rows[i].members = rows_a;
                        resolve();
                    });
                }));
            }
            
            Promise.all(selects).then(() => {
                return res.status(200).json(rows);
            });
        })
    });
});

/* GET detailed public team data */
router.get('/fetchpublic', function(req, res, next) {

    if (req.query.id === undefined)
        return res.sendStatus(400);

    id = parseInt(req.query.id)

    dbconnection.then(conn => {
        conn.query('SELECT `id_creator`, `id_sport`, `creation`, `title`, `gender`, `about` FROM `team` WHERE `id` = ?;', [id]).then(rows => {
            if (rows.length > 0) {
                let selects = [];

                selects.push(new Promise(function(resolve, reject) {
                    conn.query('SELECT `id_person`, `joined`, `coach`, `full_name` FROM `person_team`, `person` WHERE `id_person` = `person`.id AND `id_team` = ?;', [id]).then(rows_a => {
                        rows[0].members = rows_a;
                        resolve();
                    })
                }));

                Promise.all(selects).then(() => {
                    return res.status(200).json({...rows[0]});
                });
            }
            else
                return res.sendStatus(404);
        })
    });
});


/* PATCH existing team data */
router.patch('/update', multerUpload.single('avatar'), function(req, res, next) {

    var decodedToken = null;
    var form = req.body;

    console.log(chalk.magentaBright('Edição') + ' solicitada para time de ID #' + form.id);

    try {
        decodedToken = jwt.verify(req.cookies['token'], process.env.DB_PASS);
    }
    catch (err) {
        console.log(chalk.redBright('FALHA TOKEN USUÁRIO'));
        return res.sendStatus(400);
    }

    
    if (req.file !== undefined)
    {
        jimp.read(req.file.path)
        .then(image => {
            image.resize(256, 256).quality(75).write(path.join(__dirname, '..', '..', 'public', 'images', 'team_pfp', form.id + '.jpg'));
            fs.unlinkSync(req.file.path);
        })
    }

    dbconnection.then(conn => {

        conn.query('SELECT `id_creator` FROM `team` WHERE `id` = ?;', [form.id]).then(rows => { 
            if (rows.length == 0)
            {
                res.sendStatus(400);
                console.log(chalk.redBright('TIME INEXISTENTE'));
            }
            else if (rows[0].id_creator !== decodedToken.uid)
            {
                res.sendStatus(401);
                console.log(chalk.redBright('NÃO AUTORIZADO'));
            }
            
            else
            {
                conn.query('UPDATE `team` SET `title` = ?, `about` = ?, `id_sport` = ?, `gender` = ? WHERE `id` = ?;', 
                    [form.name, form.about === '' ? null : form.about, form.sport, form.gender, form.id]).then(rows_a => {
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

/* POST new teamdata */
router.post('/create', multerUpload.single('avatar'), function(req, res, next) {

    var decodedToken = null;
    var form = req.body;

    console.log(chalk.green('Criação') + ' solicitada para time');

    try {
        decodedToken = jwt.verify(req.cookies['token'], process.env.DB_PASS);
    }
    catch (err) {
        console.log(chalk.redBright('FALHA TOKEN USUÁRIO'));
        return res.sendStatus(400);
    }

    dbconnection.then(conn => {
        conn.query('INSERT INTO `team` (`id_creator`, `id_sport`, `title`, `about`, `gender`) VALUES (?, ?, ?, ?, ?);', 
            [decodedToken.uid, form.sport, form.name, form.about === '' ? null : form.about, form.gender]).then(rows => {
            if (rows.affectedRows > 0 )
            {
                conn.query('INSERT INTO `person_team` (`id_person`, `id_team`, `coach`) VALUES (?, ?, ?);', 
                    [decodedToken.uid, rows.insertId, 0]);

                if (req.file !== undefined)
                {
                    jimp.read(req.file.path)
                    .then(image => {
                        image.resize(256, 256).quality(75).write(path.join(__dirname, '..', '..', 'public', 'images', 'team_pfp', rows.insertId.toString() + '.jpg'));
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


/* DELETE team data */
router.delete('/delete', function(req, res, next) {

    var decodedToken = null;
    var form = req.body;

    console.log(chalk.red('Remoção') + ' solicitada para time de ID #' + form.id);

    try {
        decodedToken = jwt.verify(req.cookies['token'], process.env.DB_PASS);
    }
    catch (err) {
        console.log(chalk.redBright('FALHA TOKEN USUÁRIO'));
        return res.sendStatus(400);
    }

    dbconnection.then(conn => {

        conn.query('SELECT `id_creator` FROM `team` WHERE `id` = ?;', [form.id]).then(rows => { 
            if (rows.length == 0)
            {
                res.sendStatus(400);
                console.log(chalk.redBright('TIME INEXISTENTE'));
            }
            else if (rows[0].id_creator !== decodedToken.uid)
            {
                res.sendStatus(401);
                console.log(chalk.redBright('NÃO AUTORIZADO'));
            }  
            else
            {
                
                fs.unlink(path.join(__dirname, '..', '..', 'public', 'images', 'team_pfp', form.id.toString() + '.jpg'), (err) => {});

                conn.query('DELETE FROM `person_team` WHERE `id_team` = ?;', [form.id]);
                conn.query('DELETE FROM `team` WHERE `id` = ?;', [form.id]).then(rows_a => {
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


/* DELETE member from team */
router.delete('/removemember', function(req, res, next) {

    var decodedToken = null;
    var form = req.body;

    console.log(chalk.red('Remoção') + ' solicitada para integrante de ID # ' + form.id_person  + ' no time de ID #' + form.id_team);

    try {
        decodedToken = jwt.verify(req.cookies['token'], process.env.DB_PASS);
    }
    catch (err) {
        console.log(chalk.redBright('FALHA TOKEN USUÁRIO'));
        return res.sendStatus(400);
    }

    dbconnection.then(conn => {

        conn.query('SELECT `id_creator` FROM `team` WHERE `id` = ?;', [form.id_team]).then(rows => { 
            if (rows.length == 0)
            {
                res.sendStatus(400);
                console.log(chalk.redBright('TIME INEXISTENTE'));
            }
            else if (form.id_person !== decodedToken.uid && rows[0].id_creator !== decodedToken.uid)
            {
                res.sendStatus(401);
                console.log(chalk.redBright('NÃO AUTORIZADO'));
            }  
            else
            {
                conn.query('DELETE FROM `person_team` WHERE `id_team` = ? AND `id_person` = ?;', [form.id_team, form.id_person]);
                res.sendStatus(200);
                console.log(chalk.greenBright('SUCESSO'));
            }
        })
    });
});

/* PUT new member in team */
router.put('/addmember', function(req, res, next) {

    var decodedToken = null;
    var form = req.body;

    console.log(chalk.blueBright('Entrada') + ' solicitada para usuário no time de ID #' + form.id_team);

    try {
        decodedToken = jwt.verify(req.cookies['token'], process.env.DB_PASS);
    }
    catch (err) {
        console.log(chalk.redBright('FALHA TOKEN USUÁRIO'));
        return res.sendStatus(400);
    }

    dbconnection.then(conn => {

        conn.query('INSERT INTO `person_team` (`id_person`, `id_team`, `coach`) VALUES (?, ?, ?);', [decodedToken.uid, form.id_team, 0]);
        res.sendStatus(200);
        console.log(chalk.greenBright('SUCESSO'));
    });
});

/* PATCH coach status for member */
router.patch('/setcoach', function(req, res, next) {

    var decodedToken = null;
    var form = req.body;

    console.log(chalk.magenta('Coachzagem') + ' solicitada para integrante de ID # ' + form.id_person  + ' no time de ID #' + form.id_team);

    try {
        decodedToken = jwt.verify(req.cookies['token'], process.env.DB_PASS);
    }
    catch (err) {
        console.log(chalk.redBright('FALHA TOKEN USUÁRIO'));
        return res.sendStatus(400);
    }

    dbconnection.then(conn => {

        conn.query('SELECT `id_creator` FROM `team` WHERE `id` = ?;', [form.id_team]).then(rows => { 
            if (rows.length == 0)
            {
                res.sendStatus(400);
                console.log(chalk.redBright('TIME INEXISTENTE'));
            }
            else if (rows[0].id_creator !== decodedToken.uid)
            {
                res.sendStatus(401);
                console.log(chalk.redBright('NÃO AUTORIZADO'));
            }  
            else
            {
                conn.query('UPDATE `person_team` SET `coach` = ? WHERE `id_team` = ? AND `id_person` = ?;', [form.coach, form.id_team, form.id_person]);
                res.sendStatus(200);
                console.log(chalk.greenBright('SUCESSO'));
            }
        })
    });
});


module.exports = router;