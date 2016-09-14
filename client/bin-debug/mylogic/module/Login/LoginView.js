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
        App.MessageCenter.addListener("10005", function (msg) {
            Log.trace("收到服务器消息:", msg);
            if (msg.flag == 1) {
                Log.trace("yes");
            }
            else if (msg.flag == 2) {
                Log.trace("该用户不存在");
            }
            else {
                Log.trace("no");
            }
        }, this);
        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginClickHandler, this);
    };
    p.loginClickHandler = function (e) {
        //发送一条消息到服务器
        var msg = {};
        msg.key = "u_login_c2s";
        msg.body = {
            "account": this.txtName.text,
            "pass": this.txtPass.text
        };
        App.Socket.send(msg);
    };
    return LoginView;
}(BaseEuiView));
egret.registerClass(LoginView,'LoginView');
