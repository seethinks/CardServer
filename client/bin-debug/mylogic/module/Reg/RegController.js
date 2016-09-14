/**
 * Created by yangsong on 15-1-6.
 */
var RegController = (function (_super) {
    __extends(RegController, _super);
    function RegController() {
        _super.call(this);
        //初始化UI
        this.regView = new RegView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Reg, this.regView);
        //注册事件监听
        //this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }
    var d = __define,c=RegController,p=c.prototype;
    return RegController;
}(BaseController));
egret.registerClass(RegController,'RegController');
