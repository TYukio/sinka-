var express = require('express');
var path = require('path');
var router = express.Router();

var dbconnection = require('../../util/dbconnection');
var bcrypt = require("bcrypt");
var chalk = require('chalk');

/* POST login to account */
router.post('/signin', function(req, res, next) {
    const form = req.body;
    process.stdout.write(chalk.blue('Login') + ' solicitado para "' + chalk.bold(form.email) + '" na plataforma: ');

    dbconnection.then(conn => {
        conn.query('SELECT `pass` FROM `person` WHERE `email` = (?) LIMIT 1', [form.email]).then(rows => {
            if (rows.length > 0)
            {
                if (bcrypt.compareSync(form.pass, rows[0].pass))
                {
                    res.sendStatus(200);
                    console.log(chalk.greenBright('AUTORIZADO'));
                }
                else
                {
                    res.sendStatus(401);
                    console.log(chalk.yellowBright('SENHA INCORRETA'));
                }
            }
            else
            {
                res.sendStatus(401);
                console.log(chalk.yellowBright('E-MAIL INVALIDO'));
            }
        })
    });

});

/* POST sign account up */
router.post('/signup', function(req, res, next) {

    const form = req.body;
    process.stdout.write(chalk.yellow('Cadastro') + ' solicitado para "' + chalk.bold(form.email) + '" na plataforma: ');

    dbconnection.then(conn => {
        conn.query('SELECT 1 FROM `person` WHERE `email` = (?) LIMIT 1', [form.email]).then(rows => {
            if (rows.length === 0)
            {
                conn.query('INSERT INTO `person` (`email`, `pass`, `gender`, `birth`, `full_name`) VALUES (?, ?, ?, ?, ?)', 
                    [form.email, bcrypt.hashSync(form.pass, 4), form.gender.charAt(0), form.birth.substr(0, 10), form.name ]).then(rows => {
                    if (rows.affectedRows > 0 )
                    {
                        res.sendStatus(201);
                        console.log(chalk.greenBright('SUCESSO'));
                    }  
                    else
                    {
                        res.sendStatus(500);
                        console.log(chalk.redBright('ERRO SQL'));
                    }
                });
            }
            else
            {
                res.sendStatus(409);
                console.log(chalk.yellowBright('E-MAIL EM USO'));
            }
        })
    });
});

module.exports = router;