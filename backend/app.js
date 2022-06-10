require('dotenv').config({path: './database.env'});

var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Caminho do cliente compilado do react
if (!process.env.CLIENT_DIST)
    process.env.CLIENT_DIST = path.join(__dirname, '..', 'frontend', 'build')

// API
const authRouter = require('./routes/api/auth');
const userdataRouter = require('./routes/api/userdata');
const teamdataRouter = require('./routes/api/teamdata');
const courtdataRouter = require('./routes/api/courtdata');
const datafieldsRouter = require('./routes/api/datafields');

// React router
var indexRouter = require('./routes/index');

var app = express();
app.use(cors());

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.CLIENT_DIST)));
app.use(express.static('public'));

app.use('/auth/', authRouter);
app.use('/userdata/', userdataRouter);
app.use('/teamdata/', teamdataRouter);
app.use('/courtdata/', courtdataRouter);
app.use('/datafields/', datafieldsRouter);
app.use('*', indexRouter);

module.exports = app;