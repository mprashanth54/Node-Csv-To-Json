var express = require('express');
var router = express.Router();
var db = require('../db');
var async = require('async');
const csv = require('csvtojson')
var profile = require('../models/profileSchema');

function csvToJsonValidation(callback) {
    const data = [];
    const errors = [];
    csv()
        .fromFile('./doodleblue.csv')
        .on('json', (jsonObj) => {
            //perform transformations and changes here
            //Mongoose validations 
            var reg = /^\d+$/; //To check if age is a number
            jsonObj.married = (jsonObj.married === 'TRUE') ? true : false;
            jsonObj.age = (reg.test(jsonObj.age)) ? parseInt(jsonObj.age) : "Not a number";
            var Profile = new profile(jsonObj);
            var error = Profile.validateSync();
            if (error === undefined) data.push(jsonObj);
            else errors.push(error);

        })
        .on('done', (error) => {
            if (error) callback(null, data, error);
            else callback(null, data, (errors.length>0)?errors: undefined);
        });
}
function saveToDb(data, errors, callback) {

    if (errors !== undefined) {
        callback(errors);
    }
    else {
        console.log(data);
        db.profiles.insert(data, { ordered: false }, function (error, docs) {
            if (error) {
                console.log(error);
                callback(error);
            }
            else callback(null, docs);
        });
    }
}



router.get('/', function (req, res) {
    db.profiles.find({}, function (err, docs) {
        console.log(docs);
        res.json(docs);
    })

})

router.post('/', function (req, res) {
    async.waterfall([
        csvToJsonValidation,
        saveToDb
    ], function (err, result) {
        if (err) {
            res.json(err);
        }
        else res.json(result);
    });

})


module.exports = router;

