/**
 * Created by G510 on 2016/9/9.
 */
var async = require("async");
var mongoose = require("mongoose");

var wss = require("../net/WsServer")();
var protoCtrl = require("../system/ProtoCtrl")();
var dbm = require("../db/DbManager")();
var dbEvent = require("../events/DbEvent")();
var netEvent = require("../events/NetEvent")();
var login = require("../system/Login")();
var logout = require("../system/Logout")();
var reg = require("../system/Reg")();

exports = module.exports = function () {
    var systemCenter = {};

    systemCenter.dbe = dbEvent;
    systemCenter.nete = netEvent;

    systemCenter.init = function (configObj) {
        systemCenter.configObj = configObj;
        async.series([
                function (callback) {
                    protoCtrl.setup();
                    systemCenter.protoCtrl = protoCtrl;
                    callback(null, 'step 1 --> read proto data');
                },
                function (callback) {
                    // 收到数据库连接成功才会进行下一步
                    systemCenter.dbe.on(sysCtr.dbe.EN_CONNECTED, function () {
                        callback(null, 'step 2 --> connect mongodb success');
                    });
                    dbm.setup();
                    systemCenter.dbm = dbm;
                },
                function (callback) {
                    wss.setup();
                    systemCenter.wss = wss;
                    callback(null, 'step 3 --> starting ws server');
                }
            ],
            function (err, results) {
                console.log("err:" + err + "  results:" + results)
            }
        );

        // 注册server事件
        reg.addEvent();
        login.addEvent();
        logout.addEvent();
    }
    return systemCenter;
}