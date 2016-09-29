/**
 * Created by seethinks@gmail.com on 2016/9/26.
 */
class LobbyView extends BaseEuiView
{
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);
        this.skinName = "resource/skins/LobbyUISkin.exml";
    }

    public btnLobby0:eui.Button;
    public btnLobby1:eui.Button;
    public btnLobby2:eui.Button;

    public initUI():void {
        super.initUI();
        this.btnLobby0.name = "1000" ;
        this.btnLobby0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goLobbyHandler,this);

        this.btnLobby1.name = "1001" ;
        this.btnLobby1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goLobbyHandler,this);

        this.btnLobby2.name = "1002" ;
        this.btnLobby2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goLobbyHandler,this);
    }

    private goLobbyHandler(e:egret.TouchEvent):void
    {
        var zoneID:string = e.currentTarget.name;
        if(PlayerSystem.selfPlayerInfo.zoneID != parseInt(zoneID) || PlayerSystem.selfPlayerInfo.zoneID ==0)
        {
            var msg = {
                "zoneID" : zoneID,
                "uid":PlayerSystem.selfPlayerInfo.userID
            };
            App.PFE.pomelo.request("connector.entryHandler.enterZone",msg,function(res){
                App.EasyLoading.showLoading();
                if(res.code == Code.OK )
                {
                    App.EasyLoading.hideLoading();
                    PlayerSystem.selfPlayerInfo.zoneID = res.msg[0].zoneID;
                    App.SceneManager.runScene(SceneConsts.Zone1);
                }
            });
        }
    }
}