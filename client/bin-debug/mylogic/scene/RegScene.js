/**
 * Created by egret on 15-1-7.
 */
var RegScene = (function (_super) {
    __extends(RegScene, _super);
    /**
     * 构造函数
     */
    function RegScene() {
        _super.call(this);
    }
    var d = __define,c=RegScene,p=c.prototype;
    /**
     * 进入Scene调用
     */
    p.onEnter = function () {
        _super.prototype.onEnter.call(this);
        //添加该Scene使用的层级
        this.addLayer(LayerManager.UI_Main);
        //初始打开Loading页面
        App.ViewManager.open(ViewConst.Reg);
    };
    /**
     * 退出Scene调用
     */
    p.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return RegScene;
}(BaseScene));
egret.registerClass(RegScene,'RegScene');
