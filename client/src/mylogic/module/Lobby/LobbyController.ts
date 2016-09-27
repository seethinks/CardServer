/**
 * Created by yangsong on 15-1-6.
 */
class LobbyController extends BaseController{

    private lobbyView:LobbyView;

    public constructor(){
        super();


        this.lobbyView = new LobbyView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Lobby,this.lobbyView);

        //注册事件监听
        //this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }

//    private setProgress(current:number, total:number):void{
//        this.loginView.setProgress(current, total);
//    }
}
