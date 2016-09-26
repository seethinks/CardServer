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
        this.btnReg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.regClickHandler, this);
    };
    p.regClickHandler = function (e) {
        var msg = {
            "account": encodeURIComponent(this.txtName.text),
            "pass": encodeURIComponent(this.txtPass.text)
        };
        //App.PFE.pomelo.request("connector.entryHandler.reg",msg,function(res){
        //    if(res.code == Code.OK )
        //    {
        //        PlayerSystem.selfPlayerInfo.account = msg.account;
        //        App.SceneManager.runScene(SceneConsts.Login);
        //    }
        //});
    };
    return RegView;
}(BaseEuiView));
egret.registerClass(RegView,'RegView');
