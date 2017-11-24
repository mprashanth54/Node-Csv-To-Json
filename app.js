// dependencies
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var profile = require('./models/profileSchema');
mongoose.createConnection('mongodb://prashanth:prashanth@ds143330.mlab.com:43330/sandwich-ordering-app');

var app = express();

// require routes
var routes_public = require('./routes/public.js');
// define middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// routes
app.use('/api/v1', routes_public);

app.get('/', function (req, res) {
    res.json({ message: "Success" });
});

// error hndlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next("Not found");
});


// app.use(function(err, req, res, next) {

//     var responseData;

//     if (err.name === 'JsonSchemaValidation') {
//         // Log the error however you please 
//         console.log(err.message);
//         // logs "express-jsonschema: Invalid data found" 

//         // Set a bad request http response status or whatever you want 
//         res.status(400);

//         // Format the response body however you want 
//         responseData = {
//            statusText: 'Bad Request',
//            jsonSchemaValidation: true,
//            validations: err.validations  // All of your validation information 
//         };

//         // Take into account the content type if your app serves various content types 
//         if (req.xhr || req.get('Content-Type') === 'application/json') {
//             res.json(responseData);
//         } else {
//             // If this is an html request then you should probably have 
//             // some type of Bad Request html template to respond with 
//             res.json(responseData);
//         }
//     } else {
//         // pass error to next error middleware handler 
//         next(err);
//     }
// });

app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});




module.exports = app;
