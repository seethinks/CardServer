/**
 * Created by egret on 15-1-7.
 */
class RegView extends BaseEuiView{
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);

        this.skinName = "resource/skins/RegUISkin.exml";

    }

    public btnReg:eui.Button;
    public txtName:eui.TextInput;
    public txtPass:eui.TextInput;

    public initUI():void {
        super.initUI();
        this.btnReg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.regClickHandler,this);
    }

    private regClickHandler(e:egret.TouchEvent):void
    {
        var msg = {
            "account" : encodeURIComponent(this.txtName.text),
            "pass" : encodeURIComponent(this.txtPass.text)
        };

        App.PFE.pomelo.request("connector.entryHandler.reg",msg,function(res){
            if(res.code == Code.OK )
            {
                PlayerSystem.selfPlayerInfo.account = msg.account;
                App.SceneManager.runScene(SceneConsts.Login);
            }
        });
    }
}