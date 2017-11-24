// profile model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var genders = "MALE FEMALE".split(" ");

var profile = new Schema({
    email: {
        type:String,
        match: /\S+@\S+\.\S+/,
  	    unique:true
    }, //1. email validation pattern matching
    name: {type: String, required: true}, // 2. Required validation
    age: {type: Number, min: 16, max: 60}, // 3. Minimum and Maximum value validation
    gender: {type: String, enum: genders}, // 4. ENUM validation
    married: {type: Boolean, required: true} // 5. Boolean required validation
});

module.exports = mongoose.model('profiles', profile);