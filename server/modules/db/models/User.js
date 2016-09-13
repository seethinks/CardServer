/**
 * Created by G510 on 2016/9/13.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/SMUser');
var Users = mongoose.model('user', userSchema);

module.exports = Users;