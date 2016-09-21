//var pomelo = require('pomelo');
var async = require('async');
var userModel = require("../dao/models/User");
var utils = require('../util/utils');
var Code = require('../../../shared/code');

var userDao = module.exports;

/**
 * Get user Info by username.
 * @param {String} username
 * @param {String} passwd
 * @param {function} cb
 */
userDao.getUserInfo = function (ua, cb) {
    console.log("ua:"+ua)
    var user = userModel.User;
    var queryDoc = {account: ua};

    user.findOne(queryDoc, function (err, doc) {
        if (err) {
            console.log("count err:" + err)
            utils.invokeCallback(cb, null, err);
        } else {
            if (!doc) {
                utils.invokeCallback(cb, null, Code.ENTRY.FA_USER_NOT_EXIST);
            } else {
                console.log(doc._id,doc.account,doc.money,doc.password);
                utils.invokeCallback(cb, null, doc);
            }
        }
    })
};


userDao.Login = function (ua, pwd, cb) {
    var user = userModel.User;
    var queryDoc = {account: ua};
    user.findOne(queryDoc, function (err, doc) {
        if (err) {
            utils.invokeCallback(cb, null, err);
        } else {
            if (!doc) {
                utils.invokeCallback(cb, null, Code.ENTRY.FA_USER_NOT_EXIST);
            } else {
                if(doc.password != pwd)
                {
                    utils.invokeCallback(cb, null, Code.ENTRY.FA_USER_PWD_ERROR);
                }else
                {
                    utils.invokeCallback(cb, null, Code.OK,doc);
                }
            }
        }
    })
};






