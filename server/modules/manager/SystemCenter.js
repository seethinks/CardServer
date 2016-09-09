/**
 * Created by G510 on 2016/9/9.
 */
var wss = require("./WsServer")();
var protoCtrl = require("../system/ProtoCtrl")();

exports = module.exports = function () {
    var systemCenter = {};
    systemCenter.init = function()
    {
        protoCtrl.setup();
        systemCenter.protoCtrl = protoCtrl;

        wss.setup();
        systemCenter.wss = wss;

    }

    return systemCenter;
}
