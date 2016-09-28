/**
 * Created by seethinks@gmail.com on 2016/9/26.
 */
var Zone1View = (function (_super) {
    __extends(Zone1View, _super);
    function Zone1View($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/Zone1UISkin.exml";
    }
    var d = __define,c=Zone1View,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.btnLobby0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exitLobbyHandler, this);
    };
    p.exitLobbyHandler = function (e) {
        var zoneID = e.currentTarget.name;
        if (PlayerSystem.selfPlayerInfo.zoneID != parseInt(zoneID)) {
            var msg = {
                "zoneID": PlayerSystem.selfPlayerInfo.zoneID,
                "uid": PlayerSystem.selfPlayerInfo.userID
            };
            App.PFE.pomelo.request("connector.entryHandler.leaveZone", msg, function (res) {
                App.EasyLoading.showLoading();
                if (res.code == Code.OK) {
                    App.EasyLoading.hideLoading();
                    App.SceneManager.runScene(SceneConsts.UI);
                }
            });
        }
    };
    return Zone1View;
}(BaseEuiView));
egret.registerClass(Zone1View,'Zone1View');
