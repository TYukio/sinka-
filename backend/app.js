var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Caminho do cliente compilado do react
if (!process.env.CLIENT_DIST)
    process.env.CLIENT_DIST = path.join(__dirname, '..', 'frontend', 'build')

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.CLIENT_DIST)));

app.use('/', indexRouter);

module.exports = app;
