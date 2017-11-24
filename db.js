var mongodb = require('mongodb');
var mongojs = require('mongojs');
var db = mongojs('mongodb://prashanth:prashanth@ds143330.mlab.com:43330/sandwich-ordering-app', []);


module.exports = db;