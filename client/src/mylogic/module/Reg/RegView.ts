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
        App.MessageCenter.addListener("10015", function(msg):void{
            Log.trace("收到服务器消息:", msg);
            if(msg.flag == 1)
            {
                Log.trace("yes");
            }else if(msg.flag == 2)
            {
                Log.trace("已经被注册过");
            }else
            {
                Log.trace("no");
            }
        }, this);

        this.btnReg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.regClickHandler,this);
    }

    private regClickHandler(e:egret.TouchEvent):void
    {
        //发送一条消息到服务器
        var msg:any = {};
        msg.key = "u_reg_c2s";
        msg.body = {
            "account" : this.txtName.text,
            "pass" : this.txtPass.text
        };
        App.Socket.send(msg);
    }
}