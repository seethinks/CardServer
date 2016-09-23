/**
 * Created by egret on 15-1-7.
 */
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView($controller, $parent) {
        _super.call(this, $controller, $parent);
    }
    var d = __define,c=GameMainView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        var txt = new egret.TextField();
        txt.x = 200;
        txt.y = 200;
        txt.size = 69;
        txt.text = PlayerSystem.selfPlayerInfo.sign;
        this.addChild(txt);
        console.log("txt.text :" + txt.text);
        var btn = new egret.Sprite();
        btn.touchEnabled = true;
        btn.graphics.beginFill(0x33ff33);
        btn.graphics.drawRect(0, 0, 200, 100);
        btn.graphics.endFill();
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doLogoutHandler, this);
        this.addChild(btn);
    };
    p.doLogoutHandler = function (e) {
        App.PFE.pomelo.disconnect();
        App.SceneManager.runScene(SceneConsts.Login);
    };
    return GameMainView;
}(BaseSpriteView));
egret.registerClass(GameMainView,'GameMainView');
