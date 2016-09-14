/**
 * Created by yangsong on 15-1-6.
 */
var LoginController = (function (_super) {
    __extends(LoginController, _super);
    function LoginController() {
        _super.call(this);
        //初始化UI
        this.loginView = new LoginView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, this.loginView);
        //注册事件监听
        //this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }
    var d = __define,c=LoginController,p=c.prototype;
    return LoginController;
}(BaseController));
egret.registerClass(LoginController,'LoginController');
