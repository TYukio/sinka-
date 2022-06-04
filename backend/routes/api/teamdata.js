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

module.exports = router;