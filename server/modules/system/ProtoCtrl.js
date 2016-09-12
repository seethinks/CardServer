/**
 * Created by G510 on 2016/9/9.
 */
"use strict";

exports = module.exports = function () {
    var protoCtrl = {};
    protoCtrl.setup = function()
    {
        var fs= require('fs');
        var jsonObj;
        console.log(process.platform)

        if(process.platform == "darwin")
        {
            fs.readFile("../server/proto/msgData.json",function(err,data) {
                if (err) {
                    console.log(err)
                    throw err;
                }
                jsonObj = JSON.parse(data);

                var ProtoBuf = require("protobufjs");
                protoCtrl.protoRoot = ProtoBuf.loadProtoFile("../server/proto/msgData.proto");
                protoCtrl.protoJson = jsonObj;
            });
        }else
        {
            fs.readFile("../CardServer/server/proto/msgData.json",function(err,data) {
                if (err) {
                    console.log(err)
                    throw err;
                }
                jsonObj = JSON.parse(data);

                var ProtoBuf = require("protobufjs");
                protoCtrl.protoRoot = ProtoBuf.loadProtoFile("../CardServer/server/proto/msgData.proto");
                protoCtrl.protoJson = jsonObj;
            });
        }
    }

    return protoCtrl;
}
