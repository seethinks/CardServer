var async = require('async');
var userModel = require("../dao/models/User");
var zoneModel = require("../dao/models/Zone");
var utils = require('../util/utils');
var Code = require('../../../shared/code');
var aes = require('../util/doAES');

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


//userDao.Login = function (ua, pwd, cb) {
//    var user = userModel.User;
//    var queryDoc = {account: ua};
//    user.findOne(queryDoc, function (err, doc) {
//        if (err) {
//            utils.invokeCallback(cb, null, err);
//        } else {
//            if (!doc) {
//                utils.invokeCallback(cb, null, Code.ENTRY.FA_USER_NOT_EXIST);
//            } else {
//                if(doc.password != pwd)
//                {
//                    utils.invokeCallback(cb, null, Code.ENTRY.FA_USER_PWD_ERROR);
//                }else
//                {
//                    var tokenClass = require('../../../shared/token');
//                    var timestamp = Date.now();
//                    var token = tokenClass.create(ua,timestamp,pwd);
//
//                    var tokenJm = aes.encryption(token,doc._id);
//                    var msg = {token:tokenJm,uid:doc._id};
//                    console.log(aes.decryption(tokenJm,doc._id));
//                    utils.invokeCallback(cb, null, Code.OK,msg);
//
//                }
//            }
//        }
//    })
//};

userDao.logout = function (uid, cb) {
    utils.invokeCallback(cb, null, Code.OK);
};


// ------------------------------------------------------------------------ have room




// ------------------------------------------------------------------------ have zone
userDao.createZone = function()
{
    var zone = zoneModel.Zone;
    var queryDoc = {id: 1000};

    zone.count(queryDoc, function (err, doc) {
        if (err) {
            console.log("createZone fault.");
        } else {
            if (doc == 0) {
                var zoneData = new zone({
                    id: 1000,
                    onlineCount: 0,
                    name: "泰格星球"
                });
                zoneData.save(function (err) {
                    if (err) {
                        console.log("createZone fault.");
                    } else {
                        console.log("createZone success.");
                    }
                })
            } else {
                console.log("createZone fault with "+Code.ZONE.FA_ALREADY_EXIST);
            }
        }
    })
}

userDao.updateZoneOnlineCount = function(type,id)
{
    var zone = zoneModel.Zone;
    if(type == "enter")
    {
        zone.update({"id":id},{"onlineCount":200})
    }

}

