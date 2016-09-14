/**
 * Created by G510 on 2016/9/14.
 */
var userModel = require("../db/models/User");

exports = module.exports = function () {
    var reg = {};

    reg.addEvent = function () {
        sysCtr.nete.on("10010", function (data) {
            var user = userModel.User;
            var queryDoc = {account: data.account};
            var sendProtoClass = sysCtr.protoCtrl.protoRoot.build(sysCtr.protoCtrl.protoJson["10015"]);
            var sendProtoData;

            user.count(queryDoc, function (err, doc) {
                if (err) {
                    console.log("count err:" + err)
                    sendProtoData = new sendProtoClass({flag: 0});
                    sysCtr.wss.send(10015, sendProtoData);
                } else {
                    if (doc == 0) {
                        var userData = new user({
                            account: data.account,
                            password: data.pass,
                            nickName: "",
                            money: 1000
                        });
                        userData.save(function (err) {
                            if (err) {
                                console.log("save err:" + err)
                                sendProtoData = new sendProtoClass({flag: 0});
                                sysCtr.wss.send(10015, sendProtoData);
                            } else {
                                sendProtoData = new sendProtoClass({flag: 1});
                                sysCtr.wss.send(10015, sendProtoData);
                            }
                        })
                    } else {
                        sendProtoData = new sendProtoClass({flag: 2});
                        sysCtr.wss.send(10015, sendProtoData);
                    }
                }
            })
        })
    }
    return reg;
}

