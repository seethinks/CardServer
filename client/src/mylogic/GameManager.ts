/**
 * Created by seethinks@gmail.com on 2016/9/14.
 */
class GameManager{

    private static _singleton:boolean = true;
    private static _instance:GameManager;

    public constructor() {
        if (GameManager._singleton) {
            throw new Error("");
        }
    }

    public static getInstance():GameManager {
        if (!GameManager._instance) {
            GameManager._singleton = false;
            GameManager._instance = new GameManager();
            GameManager._singleton = true;
        }
        return GameManager._instance;
    }

    public connectServer()
    {
        App.Socket.connect();
        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, ()=>{
            Log.trace("与服务器连接上");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, ()=>{
            Log.trace("与服务器重新连接上");
            //send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT, ()=>{
            Log.trace("开始与服务器重新连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE, ()=>{
            Log.trace("与服务器断开连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT, ()=>{
            Log.trace("服务器连接不上");
        }, this);
    }


}