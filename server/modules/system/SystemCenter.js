/**
 * Created by G510 on 2016/9/9.
 */
var async = require("async");
var wss = require("../net/WsServer")();
var protoCtrl = require("../system/ProtoCtrl")();
var dbm = require("../db/DbManager")();
var dbEvent = require("../events/DbEvent")();
var netEvent = require("../events/NetEvent")();

exports = module.exports = function () {
    var systemCenter = {};

    systemCenter.dbe = dbEvent;
    systemCenter.nete = netEvent;

    systemCenter.init = function(configObj)
    {
        systemCenter.configObj = configObj;
        async.series([
                function(callback)
                {
                    protoCtrl.setup();
                    systemCenter.protoCtrl = protoCtrl;
                    callback(null, 'step 1 --> read proto data');
                },
                function(callback)
                {
                    // 收到数据库连接成功才会进行下一步
                    systemCenter.dbe.on(sysCtr.dbe.EN_CONNECTED,function(){
                        callback(null, 'step 2 --> connect mongodb');
                    });
                    dbm.setup();
                    systemCenter.dbm = dbm;
                },
                function(callback)
                {
                    wss.setup();
                    systemCenter.wss = wss;
                    callback(null, 'step 3 --> start ws server');
                }
            ],
            function(err, results){
                console.log("err:"+err+"  results:"+results)
            }
        );


//        systemCenter.nete.on("10001",function(data){
//            console.log("data:"+data.accid)
//            console.log("data:"+data.tstamp)
//            console.log("data:"+data.ticket)
//        })
//
//        setTimeout(function(){
//            var sendProtoClass = sysCtr.protoCtrl.protoRoot.build(sysCtr.protoCtrl.protoJson["10005"]);
//            var num = Math.round(Math.random()*1);
//            var sendProtoData = new sendProtoClass(
//                {
//                    flag:num
//                }
//            );
//            wss.send(10005,sendProtoData.encode().toBuffer());
//        },4800)
    }

    return systemCenter;
}
