var async = require('async');
var userModel = require("../dao/models/User");
var utils = require('../util/utils');
var Code = require('../../../shared/code');
var aes = require('../util/doAES');
var mongoose = require('mongoose');

var redis = require("redis");
var client = redis.createClient();

var userDao = module.exports;

// ----------------------------------------------------- have user
/**
 * Get user Info by username.
 * @param {String} username
 * @param {function} cb
 */
userDao.getUserInfo = function (ua, cb) {
    var user = userModel.User;
    var queryDoc = {account: ua};
    user.findOne(queryDoc, function (err, doc) {
        if (err) {
            utils.invokeCallback(cb, null, err);
        } else {
            if (!doc) {
                utils.invokeCallback(cb, null, Code.ENTRY.FA_USER_NOT_EXIST);
            } else {
                utils.invokeCallback(cb, null, Code.OK,doc);
            }
        }
    })
};


//userDao.Reg = function (ua, pwd, cb) {
//    var user = userModel.User;
//    var queryDoc = {account: ua};
//
//    user.count(queryDoc, function (err, doc) {
//        if (err) {
//            utils.invokeCallback(cb, null, Code.FAIL);
//        } else {
//            if (doc == 0) {
//                var userData = new user({
//                    account: ua,
//                    password: pwd,
//                    nickName: "",
//                    money: 1000
//                });
//                userData.save(function (err) {
//                    if (err) {
//                        utils.invokeCallback(cb, null, Code.FAIL);
//                    } else {
//                        utils.invokeCallback(cb, null, Code.OK);
//                    }
//                })
//            } else {
//                utils.invokeCallback(cb, null, Code.ENTRY.FA_REG_USER_ALREADY_EXIST);
//            }
//        }
//    })
//};


userDao.Login = function (uid, cb) {
    var user = userModel.User;
    var queryDoc = {_id: mongoose.Types.ObjectId(uid)};
    user.findOne(queryDoc, function (err, doc) {
        if (err) {
            utils.invokeCallback(cb, null, err);
        } else {
            if (!doc) {
                utils.invokeCallback(cb, null, Code.ENTRY.FA_USER_NOT_EXIST);
            } else {
                var msg = {data:doc};
                client.set(uid,doc,redis.print);
                utils.invokeCallback(cb, null, Code.OK,msg);
            }
        }
    })
};

userDao.logout = function (uid, cb) {
    utils.invokeCallback(cb, null, Code.OK);
};


// ------------------------------------------------------------------------ have room
