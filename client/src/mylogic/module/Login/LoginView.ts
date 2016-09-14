/**
 * Created by egret on 15-1-7.
 */
class LoginView extends BaseEuiView{
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);

        this.skinName = "resource/skins/LoginUISkin.exml";

    }

    public btnLogin:eui.Button;
    public txtName:eui.TextInput;
    public txtPass:eui.TextInput;

    public initUI():void {
        super.initUI();
        App.MessageCenter.addListener("10005", function(msg):void{
            Log.trace("收到服务器消息:", msg);
            if(msg.flag == 1)
            {
                Log.trace("yes");
            }else if(msg.flag == 2)
            {
                Log.trace("该用户不存在");
            }else
            {
                Log.trace("no");
            }
        }, this);

        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.loginClickHandler,this);
    }

    private loginClickHandler(e:egret.TouchEvent):void
    {
        //发送一条消息到服务器
        var msg:any = {};
        msg.key = "u_login_c2s";
        msg.body = {
            "account" : this.txtName.text,
            "pass" : this.txtPass.text
        };
        App.Socket.send(msg);
    }
}