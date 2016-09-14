/**
 * Created by G510 on 2016/9/13.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
    account:{type: String, index: true},
    password:String,
    nickName:String,
    money:Number,
    create_date:{type:Date,default:Date.now()}
});

module.exports = users;
