/**
 * Created by seethinks@gmail.com on 2016/9/26.
 */
class Zone1View extends BaseEuiView
{
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);
        this.skinName = "resource/skins/Zone1UISkin.exml";
    }

    public btnLobby0:eui.Button;

    public initUI():void {
        super.initUI();
        this.btnLobby0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.exitLobbyHandler,this);
    }

    private exitLobbyHandler(e:egret.TouchEvent):void
    {
        var zoneID:string = e.currentTarget.name;
        if(PlayerSystem.selfPlayerInfo.zoneID != parseInt(zoneID))
        {
            var msg = {
                "zoneID" : PlayerSystem.selfPlayerInfo.zoneID,
                "uid":PlayerSystem.selfPlayerInfo.userID
            };
            App.PFE.pomelo.request("connector.entryHandler.leaveZone",msg,function(res){
                App.EasyLoading.showLoading();
                if(res.code == Code.OK )
                {
                    App.EasyLoading.hideLoading();
                    App.SceneManager.runScene(SceneConsts.UI);
                }
            });
        }
    }
}