/**
 * Created by G510 on 2016/9/9.
 */
var async = require("async");
var mongoose = require("mongoose");
var userModel = require("../db/models/User");

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
                        callback(null, 'step 2 --> connect mongodb success');
                    });
                    dbm.setup();
                    systemCenter.dbm = dbm;
                },
                function(callback)
                {
                    wss.setup();
                    systemCenter.wss = wss;
                    callback(null, 'step 3 --> starting ws server');
                }
            ],
            function(err, results){
                console.log("err:"+err+"  results:"+results)
            }
        );


        systemCenter.nete.on("10001",function(data){
            console.log("data:"+data.account)
            console.log("data:"+data.pass)
            var user = userModel.User;
            var queryDoc = {name:data.account,password:data.pass};
            user.count(queryDoc,function(err,doc){
                console.log("err:"+err);
                console.log("doc:"+doc);
                if(doc == 0)
                {
                    var userData= new user({
                        id:0,
                        account:data.account,
                        password:data.pass,
                        nickName:"",
                        money:1000

                    });
                    userData.save(function(err){
                        if(err){
                            console.log("save err:"+err)
                        }else{
                            console.log("save ok")
                        }
                    })
                    //user.save({id:1,account:data.account,password:data.pass,nickName:"",money:1000},function(err){
                    //    if(err){
                    //        console.log("save err:"+err)
                    //    }else{
                    //        console.log("save ok")
                    //    }
                    //})
                }
            })
        })
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
