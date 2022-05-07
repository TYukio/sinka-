var express = require('express');
var path = require('path');
var router = express.Router();
var chalk = require('chalk');

var dbconnection = require('../../util/dbconnection');

/* GET public user data */
router.get('/fetchpublic', function(req, res, next) {

    if (req.query.id === undefined)
        return res.sendStatus(400);

    id = parseInt(req.query.id)

    process.stdout.write(chalk.greenBright('Perfil') + ' de ID #' + chalk.bold(id) + ' acessado na plataforma: ');

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

module.exports = router;