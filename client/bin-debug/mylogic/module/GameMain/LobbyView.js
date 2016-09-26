/**
 * Created by seethinks@gmail.com on 2016/9/26.
 */
var LobbyView = (function (_super) {
    __extends(LobbyView, _super);
    function LobbyView(controller, $parent) {
        _super.call(this, controller, $parent);
    }
    var d = __define,c=LobbyView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        var btn = new egret.Sprite();
        btn.graphics.beginFill(0x11bbcc);
        btn.graphics.drawRect(0, 0, 222, 250);
        btn.graphics.endFill();
        this.addChild(btn);
    };
    return LobbyView;
}(BaseSpriteView));
egret.registerClass(LobbyView,'LobbyView');
