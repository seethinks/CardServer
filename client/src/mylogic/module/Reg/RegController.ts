/**
 * Created by yangsong on 15-1-6.
 */
class RegController extends BaseController{

    private regView:RegView;

    public constructor(){
        super();

        //初始化UI
        this.regView = new RegView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Reg, this.regView);

        //注册事件监听
        //this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }

//    private setProgress(current:number, total:number):void{
//        this.loginView.setProgress(current, total);
//    }
}
