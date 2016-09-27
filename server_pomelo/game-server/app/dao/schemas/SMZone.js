/**
 * Created by G510 on 2016/9/13.
 */
var userSchema = require('../schemas/SMUser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zone = new Schema({
    id:{type: Number, index: true},
    onlineCount:Number,
    name:String,
    userList: [userSchema]
});

module.exports = zone;
