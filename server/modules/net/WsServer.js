/**
 * Created by G510 on 2016/9/9.
 * 管理websocket数据收发
 */
exports = module.exports = function () {
    var wsServer = {};
    var wsocket;
    var byteBufferClass = require('bytebuffer');

    wsServer.setup = function()
    {
        var port = process.env.PORT || 3008;  // systemCenter.configObj.dev.defaults.socket.port
        var ws = require('ws');
        wsocket = new ws.Server({port: port}, function() {
            console.info('Server listening on port %d', port);
        });

        wsocket.on('connection', function(s)
        {
            wsocket.s = s;
            s.on("message",function(msg){
                //console.log(msg)
                var msgId = msg.readInt16BE();
                var protoClass = sysCtr.protoCtrl.protoRoot.build(sysCtr.protoCtrl.protoJson[msgId]);
                var data = protoClass.decode(msg.slice(2, msg.length));
                sysCtr.nete.emit(msgId,data)
            });

            s.on("close",function(msg){
                console.log("a user disconnected")
            });
        });
    }

    /**
     * 发送数据到客户端
     * @param msgId 消息头
     * @param data  二进制数据
     */
    wsServer.send = function(msgId,data)
    {
        if(!wsocket.s) return;
        console.log("send data:",data);
        var sd = data.encode().toBuffer();
        var bytes = new byteBufferClass().flip();
        bytes.writeUint16(msgId);
        bytes.writeUint16(sd.length);
        bytes.append(sd)
        bytes.flip();
        var sendData = bytes.toArrayBuffer();
        wsocket.s.send(sendData, { binary: true });
    }

    /**
     * 主动关闭ws服务器
     */
    wsServer.close = function()
    {
        wsocket.s.close();
    }
    return wsServer;
}
