/**
 * Created by yangsong on 2014/11/28.
 * 游戏场景
 */
var GameMainScene = (function (_super) {
    __extends(GameMainScene, _super);
    /**
     * 构造函数
     */
    function GameMainScene() {
        _super.call(this);
    }
    var d = __define,c=GameMainScene,p=c.prototype;
    /**
     * 进入Scene调用
     */
    p.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.addLayerAt(LayerManager.Game_Main, 0);
        App.ViewManager.open(ViewConst.GameMain);
    };
    /**
     * 退出Scene调用
     */
    p.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return GameMainScene;
}(BaseScene));
egret.registerClass(GameMainScene,'GameMainScene');
