/**
 * Created by egret on 15-1-7.
 */
class GameMainView extends BaseSpriteView {

    public constructor($controller:BaseController, $parent:egret.DisplayObjectContainer) {
        super($controller, $parent);
    }

    public initUI():void
    {
        super.initUI();
        var txt:egret.TextField = new egret.TextField();
        txt.x = 200;
        txt.y =200;
        txt.size=69;
        txt.text = PlayerSystem.selfPlayerInfo.sign;
        this.addChild(txt);
        console.log("txt.text :"+txt.text )

        var btn:egret.Sprite = new egret.Sprite();
        btn.touchEnabled = true;
        btn.graphics.beginFill(0x33ff33);
        btn.graphics.drawRect(0,0,200,100);
        btn.graphics.endFill();
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.doLogoutHandler,this);
        this.addChild(btn)
    }

    private doLogoutHandler(e:egret.TouchEvent):void
    {
        App.PFE.pomelo.disconnect();
        App.SceneManager.runScene(SceneConsts.Login);
    }
}