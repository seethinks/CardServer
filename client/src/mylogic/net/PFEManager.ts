/**
 * Created by seethinks@gmail.com on 2016/9/20.
 */
class PFEManager extends BaseClass
{
    public pomelo:PomeloForEgret;
    private _server:string;
    private _port:number;

    public init():void
    {
        /**
         * 连接 gate服务器，做负载均衡
         */
        App.MessageCenter.addListener(SocketConst.SOCKET_GATE_CONNECT, ()=> {
            Log.trace("与Gate服务器连接上");
            App.PFE.pomelo.request("gate.gateHandler.queryEntry",{uid:Math.round(Math.random()*55555)},function(res){
                if(res.code == Code.OK )
                {
                    App.PFE.pomelo.disconnect();
                    GlobalVar.ConnectServer = res.host;
                    GlobalVar.ConnectPort = res.port;
                    console.log(" GlobalVar.ConnectServer :"+ GlobalVar.ConnectServer ,"    GlobalVar.ConnectPort:"+  GlobalVar.ConnectPort)
                    App.PFE.conncet(GlobalVar.ConnectServer,GlobalVar.ConnectPort);
                }
            });
        }, this);
        if(App.GlobalData.IsDebug)
        {
            App.PFE.conncet(App.GlobalData.DebugSocketServer,App.GlobalData.DebugSocketPort,"gate");
        }else
        {
            App.PFE.conncet(App.GlobalData.SocketServer,App.GlobalData.SocketPort,"gate");
        }
    }

    public conncet(server:string,port:number,serverType:string=""):void {
        if (App.DeviceUtils.IsHtml5) {
            if (!window["WebSocket"]) {
                Log.trace("不支持WebSocket");
                return;
            }
        }
        this._server = server;
        this._port = port;
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
        this.pomelo.init( {host:this._server, port:this._port,user:{}},function(){

        },serverType);
    }
}