/**
 * Created by G510 on 2016/9/13.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/SMUser');
var User = mongoose.model('users', userSchema);

exports.User = User;