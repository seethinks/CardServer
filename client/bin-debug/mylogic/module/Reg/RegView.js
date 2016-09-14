/**
 * Created by egret on 15-1-7.
 */
var RegView = (function (_super) {
    __extends(RegView, _super);
    function RegView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/RegUISkin.exml";
    }
    var d = __define,c=RegView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        App.MessageCenter.addListener("10015", function (msg) {
            Log.trace("收到服务器消息:", msg);
            if (msg.flag == 1) {
                Log.trace("yes");
            }
            else if (msg.flag == 2) {
                Log.trace("已经被注册过");
            }
            else {
                Log.trace("no");
            }
        }, this);
        this.btnReg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.regClickHandler, this);
    };
    p.regClickHandler = function (e) {
        //发送一条消息到服务器
        var msg = {};
        msg.key = "u_reg_c2s";
        msg.body = {
            "account": this.txtName.text,
            "pass": this.txtPass.text
        };
        App.Socket.send(msg);
    };
    return RegView;
}(BaseEuiView));
egret.registerClass(RegView,'RegView');