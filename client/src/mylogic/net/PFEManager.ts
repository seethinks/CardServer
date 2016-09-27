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
            egret.setTimeout(function(){
                App.PFE.pomelo.request("gate.gateHandler.queryEntry",{uid:Math.round(Math.random()*55555)},function(res){
                    if(res.code == Code.OK )
                    {
                        App.PFE.pomelo.disconnect();
                        GlobalVar.ConnectServer = res.host;
                        GlobalVar.ConnectPort = res.port;
                        App.PFE.conncet(GlobalVar.ConnectServer,GlobalVar.ConnectPort);
                    }
                });
            },this,100);
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
        App.MessageCenter.removeListener(SocketConst.SOCKET_CONNECT,this.socketConnectHandler, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT,this.socketConnectHandler, this);

        App.MessageCenter.removeListener(SocketConst.SOCKET_RECONNECT,this.socketReConnectHandler, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT,this.socketReConnectHandler, this);

        App.MessageCenter.removeListener(SocketConst.SOCKET_START_RECONNECT,this.socketStartReconnectHandler, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT,this.socketStartReconnectHandler, this);

        App.MessageCenter.removeListener(SocketConst.SOCKET_CLOSE,this.socketCloseHandler, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE,this.socketCloseHandler, this);

        App.MessageCenter.removeListener(SocketConst.SOCKET_NOCONNECT,this.socketNoConnectHandler, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT,this.socketNoConnectHandler, this);

        this.pomelo = new PomeloForEgret();
        this.pomelo.init( {host:this._server, port:this._port,user:{}},function(){

        },serverType);
    }

    private socketConnectHandler(e:any):void
    {
        Log.trace("与服务器连接上");
        egret.setTimeout(function(){
            this.doLogin();
        },this,100)
    }

    private socketReConnectHandler():void
    {
        Log.trace("与服务器重新连接上");
    }
    private socketStartReconnectHandler():void
    {
        Log.trace("开始与服务器重新连接");
    }
    private socketCloseHandler():void
    {
        Log.trace("与服务器断开连接");
    }
    private socketNoConnectHandler():void
    {
        Log.trace("服务器连接不上");
    }


    public doLogin():void
    {
        console.log("PlayerSystem.selfPlayerInfo.userID:"+PlayerSystem.selfPlayerInfo.userID);
        var msg = {
            "uid" : PlayerSystem.selfPlayerInfo.userID
        };
        App.EasyLoading.showLoading();
        App.PFE.pomelo.request("connector.entryHandler.login",msg,function(res){
            if(res.code == Code.OK )
            {

            }
            App.EasyLoading.hideLoading();
        });
    }
}