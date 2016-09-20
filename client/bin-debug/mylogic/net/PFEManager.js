/**
 * Created by seethinks@gmail.com on 2016/9/20.
 */
var PFEManager = (function (_super) {
    __extends(PFEManager, _super);
    function PFEManager() {
        _super.apply(this, arguments);
    }
    var d = __define,c=PFEManager,p=c.prototype;
    p.conncet = function () {
        if (App.DeviceUtils.IsHtml5) {
            if (!window["WebSocket"]) {
                Log.trace("不支持WebSocket");
                return;
            }
        }
        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, function () {
            Log.trace("与服务器连接上");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, function () {
            Log.trace("与服务器重新连接上");
            //send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT, function () {
            Log.trace("开始与服务器重新连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE, function () {
            Log.trace("与服务器断开连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT, function () {
            Log.trace("服务器连接不上");
        }, this);
        this.pomelo = new PomeloForEgret();
        this.pomelo.connect();
    };
    return PFEManager;
}(BaseClass));
egret.registerClass(PFEManager,'PFEManager');
