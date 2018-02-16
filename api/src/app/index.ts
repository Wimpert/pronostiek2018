import * as express from "express";


//const express  = require('express');
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port     = process.env.PORT || 8080;



const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

const app  =  express();

app.use(morgan('dev'))


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('./client/dist'));

// required for passport
app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
} ));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes.js')(app, passport);

app.listen(port , () => console.log(`Example app listening at port ${port}!`));