/**
 * Created by yangsong on 2014/11/28.
 * UI场景层
 */
var UIScene = (function (_super) {
    __extends(UIScene, _super);
    /**
     * 构造函数
     */
    function UIScene() {
        _super.call(this);
    }
    var d = __define,c=UIScene,p=c.prototype;
    /**
     * 进入Scene调用
     */
    p.onEnter = function () {
        _super.prototype.onEnter.call(this);
        //添加该Scene使用的层级
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Message);
        this.addLayer(LayerManager.UI_Tips);
        //添加一个纯色背景
        var rect = new eui.Rect();
        rect.fillColor = 0x78b93f;
        rect.percentHeight = 100;
        rect.percentWidth = 100;
        LayerManager.UI_Main.addChild(rect);
        App.ViewManager.open(ViewConst.Lobby);
    };
    /**
     * 退出Scene调用
     */
    p.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return UIScene;
}(BaseScene));
egret.registerClass(UIScene,'UIScene');
