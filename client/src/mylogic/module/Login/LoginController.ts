/**
 * Created by yangsong on 15-1-6.
 */
class LoginController extends BaseController{

    private loginView:LoginView;

    public constructor(){
        super();

        //初始化UI
        this.loginView = new LoginView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, this.loginView);

        //注册事件监听
        //this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }

//    private setProgress(current:number, total:number):void{
//        this.loginView.setProgress(current, total);
//    }
}
