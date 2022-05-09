var express = require('express');
var router = express.Router();
var dbconnection = require('../../util/dbconnection');

/* GET user types */
router.get('/usertypes', function(req, res, next) {  
    dbconnection.then(conn => {
        conn.query('SELECT * FROM `persontype`;').then(rows => {
            return res.status(200).json(rows);
        })
    });

});

/* GET sports */
router.get('/sports', function(req, res, next) {  
    dbconnection.then(conn => {
        conn.query('SELECT * FROM `sport`;').then(rows => {
            return res.status(200).json(rows);
        })
    });

});

module.exports = router;