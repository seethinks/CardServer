/**
 * Created by seethinks@gmail.com on 2016/9/14.
 */
var GameManager = (function () {
    function GameManager() {
        if (GameManager._singleton) {
            throw new Error("");
        }
    }
    var d = __define,c=GameManager,p=c.prototype;
    GameManager.getInstance = function () {
        if (!GameManager._instance) {
            GameManager._singleton = false;
            GameManager._instance = new GameManager();
            GameManager._singleton = true;
        }
        return GameManager._instance;
    };
    p.connectServer = function () {
        App.Socket.connect();
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
    };
    GameManager._singleton = true;
    return GameManager;
}());
egret.registerClass(GameManager,'GameManager');
