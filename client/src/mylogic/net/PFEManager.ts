/**
 * Created by seethinks@gmail.com on 2016/9/20.
 */
class PFEManager extends BaseClass
{
    public pomelo:PomeloForEgret;

    public conncet():void {
        if (App.DeviceUtils.IsHtml5) {
            if (!window["WebSocket"]) {
                Log.trace("不支持WebSocket");
                return;
            }
        }

        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, ()=> {
            Log.trace("与服务器连接上");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, ()=> {
            Log.trace("与服务器重新连接上");
            //send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT, ()=> {
            Log.trace("开始与服务器重新连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE, ()=> {
            Log.trace("与服务器断开连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT, ()=> {
            Log.trace("服务器连接不上");
        }, this);

        this.pomelo = new PomeloForEgret();
        this.pomelo.connect();
    }
}