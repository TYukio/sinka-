require('dotenv').config({path: './database.env'});

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Caminho do cliente compilado do react
if (!process.env.CLIENT_DIST)
    process.env.CLIENT_DIST = path.join(__dirname, '..', 'frontend', 'build')

// API
const authRouter = require('./routes/api/auth');
const userdataRouter = require('./routes/api/userdata');

// React router
var indexRouter = require('./routes/index');

var app = express();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.CLIENT_DIST)));

app.use('/auth/', authRouter);
app.use('/userdata/', userdataRouter);
app.use('*', indexRouter);

module.exports = app;
