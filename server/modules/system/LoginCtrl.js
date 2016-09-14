/**
 * Created by G510 on 2016/9/14.
 */
var userModel = require("../db/models/User");

exports = module.exports = function () {
    var login = {};

    login.setup = function () {
        login.addEvent();
    }

    login.addEvent = function()
    {
        sysCtr.nete.on("10000", function (data) {
            var user = userModel.User;
            var queryDoc = {account: data.account};

            var sendFlagClass = sysCtr.protoCtrl.protoRoot.build(sysCtr.protoCtrl.protoJson["10005"]);
            var sendFlagData;

            user.findOne(queryDoc, function (err, doc) {
                if (err) {
                    console.log("count err:" + err)
                    sendFlagData = new sendFlagClass({flag: 0,person:{}});
                    sysCtr.wss.send(10005, sendFlagData);
                } else {
                    if (!doc) {
                        sendFlagData = new sendFlagClass({flag: 2,person:{}});
                        sysCtr.wss.send(10005, sendFlagData);
                    } else {
                        console.log(doc._id,doc.account,doc.money);
                        sendFlagData = new sendFlagClass({flag:1,person:{id:doc._id.toString(),account:doc.account,name:doc.nickName,nName:doc.nickName,money:doc.money
                        }});
                        sysCtr.wss.send(10005, sendFlagData);
                    }
                }
            })
        })
    }

    return login;
}

