var express = require('express');
var path = require('path');
var router = express.Router();

/* GET react router */
router.get('*', function(req, res, next) {
  res.sendFile(path.join(process.env.CLIENT_DIST, 'index.html'))
});

module.exports = router;
