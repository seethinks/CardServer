/**
 * Created by seethinks@gmail.com on 2016/9/26.
 */
var LobbyView = (function (_super) {
    __extends(LobbyView, _super);
    function LobbyView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/LobbyUISkin.exml";
    }
    var d = __define,c=LobbyView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.btnLobby0.name = "1000";
        this.btnLobby0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goLobbyHandler, this);
        this.btnLobby1.name = "1001";
        this.btnLobby1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goLobbyHandler, this);
        this.btnLobby2.name = "1002";
        this.btnLobby2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goLobbyHandler, this);
    };
    p.goLobbyHandler = function (e) {
        var zoneID = e.currentTarget.name;
        if (PlayerSystem.selfPlayerInfo.zoneID != parseInt(zoneID) || PlayerSystem.selfPlayerInfo.zoneID == 0) {
            var msg = {
                "zoneID": zoneID,
                "uid": PlayerSystem.selfPlayerInfo.userID
            };
            App.PFE.pomelo.request("connector.entryHandler.enterZone", msg, function (res) {
                App.EasyLoading.showLoading();
                if (res.code == Code.OK) {
                    App.EasyLoading.hideLoading();
                    PlayerSystem.selfPlayerInfo.zoneID = res.msg[0].zoneID;
                    App.SceneManager.runScene(SceneConsts.Zone1);
                }
            });
        }
    };
    return LobbyView;
}(BaseEuiView));
egret.registerClass(LobbyView,'LobbyView');
