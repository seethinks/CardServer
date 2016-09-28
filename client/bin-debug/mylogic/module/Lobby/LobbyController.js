/**
 * Created by yangsong on 15-1-6.
 */
var LobbyController = (function (_super) {
    __extends(LobbyController, _super);
    function LobbyController() {
        _super.call(this);
        this.lobbyView = new LobbyView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Lobby, this.lobbyView);
        this.zone1View = new Zone1View(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Zone1, this.zone1View);
        //注册事件监听
        //this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }
    var d = __define,c=LobbyController,p=c.prototype;
    return LobbyController;
}(BaseController));
egret.registerClass(LobbyController,'LobbyController');
