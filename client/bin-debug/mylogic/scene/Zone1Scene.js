/**
 * Created by egret on 15-1-7.
 */
var Zone1Scene = (function (_super) {
    __extends(Zone1Scene, _super);
    /**
     * 构造函数
     */
    function Zone1Scene() {
        _super.call(this);
    }
    var d = __define,c=Zone1Scene,p=c.prototype;
    /**
     * 进入Scene调用
     */
    p.onEnter = function () {
        _super.prototype.onEnter.call(this);
        //添加该Scene使用的层级
        this.addLayer(LayerManager.UI_Main);
        App.ViewManager.open(ViewConst.Zone1);
    };
    /**
     * 退出Scene调用
     */
    p.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return Zone1Scene;
}(BaseScene));
egret.registerClass(Zone1Scene,'Zone1Scene');
