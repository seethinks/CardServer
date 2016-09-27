/**
 * Created by yangsong on 15-1-6.
 */
var GameMainController = (function (_super) {
    __extends(GameMainController, _super);
    function GameMainController() {
        _super.call(this);
        //初始化UI
        this.gameMainView = new GameMainView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.GameMain, this.gameMainView);
        //注册事件监听
        //this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }
    var d = __define,c=GameMainController,p=c.prototype;
    return GameMainController;
}(BaseController));
egret.registerClass(GameMainController,'GameMainController');
