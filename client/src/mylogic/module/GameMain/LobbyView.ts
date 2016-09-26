/**
 * Created by seethinks@gmail.com on 2016/9/26.
 */
class LobbyView extends BaseSpriteView
{
    public constructor(controller:BaseController, $parent:egret.DisplayObjectContainer) {
        super(controller, $parent);
    }

    public initUI():void {
        super.initUI();
        var btn:egret.Sprite = new egret.Sprite();
        btn.graphics.beginFill(0x11bbcc);
        btn.graphics.drawRect(0,0,222,250);
        btn.graphics.endFill();
        this.addChild(btn)
    }
}