/**
 * Created by egret on 15-1-7.
 */
class LoginView extends BaseEuiView {
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);

        this.skinName = "resource/skins/LoginUISkin.exml";

    }

    public btnLogin:eui.Button;
    public txtName:eui.TextInput;
    public txtPass:eui.TextInput;

    public btnReg:eui.Button;

    public initUI():void {
        super.initUI();
//        App.MessageCenter.addListener("10005", function (msg):void {
//            Log.trace("收到服务器消息:", msg);
//            if (msg.flag == 1) {
//                Log.trace("yes");
//            } else if (msg.flag == 2) {
//                Log.trace("该用户不存在");
//            } else {
//                Log.trace("no");
//            }
//        }, this);

        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginClickHandler, this);
        this.btnReg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.regClickHandler, this);
    }

    public open():void
    {
        if(PlayerSystem.selfPlayerInfo.account != "") this.txtName.text = PlayerSystem.selfPlayerInfo.account;
    }

    private regClickHandler(e:egret.TouchEvent):void
    {
        App.SceneManager.runScene(SceneConsts.Reg)
    }

    private loginClickHandler(e:egret.TouchEvent):void {
//        if(!App.PFE.pomelo.isConnecting)
//        {
//            App.PFE.init();
//            return;
//        }
        //发送一条消息到服务器
        var msg = {
            "account" : encodeURIComponent(this.txtName.text),
            "pass" : encodeURIComponent(this.txtPass.text)
        };
        //App.PFE.pomelo.request("connector.entryHandler.login",msg,function(res){
        //    if(res.code == Code.OK )
        //    {
        //        console.log("res.msg.token:"+res.msg.token);
        //        PlayerSystem.selfPlayerInfo.userID = res.msg.uid;
        //        PlayerSystem.selfPlayerInfo.sign = res.msg.token;
        //        App.SceneManager.runScene(SceneConsts.GameMain);
        //    }
        //});

//        App.Socket.send(msg);
        // this.testConnection();
//        var pomelo: Pomelo = new Pomelo();
//
//        pomelo.on('io-error', function(e:any):void {
//            // 错误处理
//        });
//
//        pomelo.on('close', function(e:any):void {
//            // 连接关闭
//        });
//        var self = this;
//// 连接到服务器 127.0.0.1:3010
//        pomelo.init({
//            host: '127.0.0.1',
//            port: '3010'
//        }, function(response:any):void {
//            console.log("response 1:"+response.msg);
//            if (response.code === 200) {
//                // 连接成功
//
//                var msg:any = {};
//                msg.key = "u_login_c2s";
//                msg.body = {
//                    "account" : self.txtName.text,
//                    "pass" : self.txtPass.text
//                };
//
//                pomelo.request(
//                    'connector.entryHandler.entry',
//                    msg,
//                    function(response:any):void {
//                        console.log("response 2:"+response.msg);
//                    });
//            }
//        });
    }

//    public pomelo;
//
//    public testConnection():void{
//        this.pomelo = new PomeloForEgret();
//        var host = "192.168.6.117";
//        var port = "3210";
//        this.pomelo.on(PomeloForEgret.EVENT_IO_ERROR, function(event){
//            //错误处理
//            console.error("error",event);
//        });
//        this.pomelo.on(PomeloForEgret.EVENT_CLOSE, function(event){
//            //关闭处理
//            console.error("close",event);
//        });
//        this.pomelo.on(PomeloForEgret.EVENT_HEART_BEAT_TIMEOUT, function(event){
//            //心跳timeout
//            console.error("heart beat timeout",event);
//        });
//        this.pomelo.on(PomeloForEgret.EVENT_KICK, function(event){
//            //踢出
//            console.error("kick",event);
//        });
//
//        var self=this;
//        this.pomelo.init({
//            host: host,
//            port: port
//        }, function () {
//            //连接成功执行函数
//            var msg = {
//                    "account" : self.txtName.text,
//                    "pass" : self.txtPass.text
//                };
//
//            self.pomelo.request("connector.entryHandler.entry",msg , function (result) {
//                //消息回调
//                console.log("request -> ",result.msg.res);
//            });
//
////            self.pomelo.request("connector.entryHandler.publish","hello world 2" , function (result) {
////                //消息回调
////                console.log("request",result);
////            });
////
////            self.pomelo.request("connector.entryHandler.subscribe","hello world 3" , function (result) {
////                //消息回调
////                console.log("request",result);
////            });
//        });

    //  }
}