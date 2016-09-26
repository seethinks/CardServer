/**
 * Created by yangsong on 15-1-6.
 */
class GameMainController extends BaseController{

    private gameMainView:GameMainView;
    private lobbyView:LobbyView;

    public constructor(){
        super();

        //初始化UI

        this.gameMainView = new GameMainView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.GameMain, this.gameMainView);

        this.lobbyView = new LobbyView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.Lobby,this.lobbyView);
        console.log("t:",this.lobbyView)

        //注册事件监听
        //this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }

//    private setProgress(current:number, total:number):void{
//        this.loginView.setProgress(current, total);
//    }
}
