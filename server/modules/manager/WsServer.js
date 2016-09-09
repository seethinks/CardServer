/**
 * Created by G510 on 2016/9/9.
 */
exports = module.exports = function () {
    var wsServer = {};

    wsServer.setup = function()
    {
        var stNetEvent = require("../events/STNetEvent")();
        var port = process.env.PORT || 3008;
        var ws = require('ws');
        var wsocket = new ws.Server({port: port}, function() {
            console.info('Server listening on port %d', port);
        });

        wsocket.on('connection', function(s) {
            s.on("message",function(msg){
                console.log(msg)
                var msgId = msg.readInt16BE();
                var protoClass = sysCtr.protoCtrl.protoRoot.build(sysCtr.protoCtrl.protoJson[msgId]);
                var data = protoClass.decode(msg.slice(2, msg.length));
                stNetEvent.emit(msgId,data)
            });

            s.on("close",function(msg){
                console.log("a user disconnected")
            });
        });

        stNetEvent.on("10001",function(data){
            console.log("data:"+data.accid)
            console.log("data:"+data.tstamp)
            console.log("data:"+data.ticket)
        })
        stNetEvent.on("10005",function(data){
        })
    }

    wsServer.connect = function()
    {

    }

    wsServer.close = function()
    {

    }
    return wsServer;
}
