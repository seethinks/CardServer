/**
 * Created by egret on 15-1-7.
 */
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/LoginUISkin.exml";
    }
    var d = __define,c=LoginView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
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
    };
    p.open = function () {
        if (PlayerSystem.selfPlayerInfo.account != "")
            this.txtName.text = PlayerSystem.selfPlayerInfo.account;
    };
    p.regClickHandler = function (e) {
        App.SceneManager.runScene(SceneConsts.Reg);
    };
    p.loginClickHandler = function (e) {
        //        if(!App.PFE.pomelo.isConnecting)
        //        {
        //            App.PFE.init();
        //            return;
        //        }
        //发送一条消息到服务器
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
    };
    return LoginView;
}(BaseEuiView));
egret.registerClass(LoginView,'LoginView');
