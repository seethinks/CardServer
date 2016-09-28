/**
 * Created by yangsong on 15-1-6.
 */
class LobbyController extends BaseController{

    private lobbyView:LobbyView;

    private zone1View:Zone1View;

    public constructor(){
        super();


        this.lobbyView = new LobbyView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Lobby,this.lobbyView);

        this.zone1View = new Zone1View(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Zone1,this.zone1View);
        //注册事件监听
        //this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }

//    private setProgress(current:number, total:number):void{
//        this.loginView.setProgress(current, total);
//    }
}
