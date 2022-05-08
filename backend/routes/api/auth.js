var express = require('express');
var path = require('path');
var router = express.Router();

var dbconnection = require('../../util/dbconnection');
var bcrypt = require("bcrypt");
var chalk = require('chalk');
var jwt = require('jsonwebtoken');

/* POST login to account */
router.post('/signin', function(req, res, next) {
    const form = req.body;
    process.stdout.write(chalk.blue('Login') + ' solicitado para "' + chalk.bold(form.email) + '" na plataforma: ');

    dbconnection.then(conn => {
        conn.query('SELECT `id`, `pass` FROM `person` WHERE `email` = (?) LIMIT 1', [form.email.toLowerCase()]).then(rows => {
            if (rows.length > 0)
            {
                var row = rows[0];
                if (bcrypt.compareSync(form.pass, row.pass))
                {
                    var token = jwt.sign({uid: row.id}, process.env.DB_PASS);
                    res.status(200).cookie('token', token).send();
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
                    [form.email.toLowerCase(), bcrypt.hashSync(form.pass, 4), form.gender.charAt(0), form.birth.substr(0, 10), form.name ]).then(rows => {
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

/* GET sign out from account */
router.get('/signout', function(req, res, next) {
    res.status(200).clearCookie('token').redirect('/').send();
});

module.exports = router;