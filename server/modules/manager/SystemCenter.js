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

        var stNetEvent = require("../events/STNetEvent")();
        stNetEvent.on("10001",function(data){
            console.log("data:"+data.accid)
            console.log("data:"+data.tstamp)
            console.log("data:"+data.ticket)
        })

        setTimeout(function(){
            var sendProtoClass = sysCtr.protoCtrl.protoRoot.build(sysCtr.protoCtrl.protoJson["10005"]);
            var num = Math.round(Math.random()*1);
            var sendProtoData = new sendProtoClass(
                {
                    flag:num
                }
            );
            wss.send(10005,sendProtoData.encode().toBuffer());
        },4800)
    }

    return systemCenter;
}
