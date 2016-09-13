/**
 * Created by G510 on 2016/9/13.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
    id:{
        type:Number
    },
    name: {
        first: String,
        last: String
    },
    email: {type: String, unique: true},
    password: {type: String, index: true},
    singupDate:{
        type:Date,
        default: Date.now()
    }
});