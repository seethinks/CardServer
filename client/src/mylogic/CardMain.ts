/**
 * Created by yangsong on 15-3-27.
 * ActDemo
 */
class CardMain{
    public constructor(){
        var groupName:string = "preload";
        var subGroups:Array<string> = ["preload_core"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete():void {
        this.initModule();
        App.Init();

        App.PFE.init();

        App.SceneManager.runScene(SceneConsts.Login);
        //音乐音效处理
        App.SoundManager.setBgOn(true);
        App.SoundManager.setEffectOn(true);

        //let aa=function():void{
        //    console.log("aa")
        //    setTimeout(function():void
        //    {
        //        console.log(" sub aa")
        //    },200)
        //    tt.complate();
        //}
        //let bb=function():void{
        //    console.log("bbb")
        //    tt.complate();
        //}
        //let cc=function():void{
        //    console.log("ccc")
        //    tt.complate();
        //}
        //var tt:AllAsyncExecutor = new AllAsyncExecutor();
        //tt.setCallBack(function():void
        //{
        //    console.log("end");
        //},this)
        //tt.regist(aa,this)
        //tt.regist(bb,this)
        //tt.regist(cc,this)
        //
        //tt.start();


    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }


    /**
     * 初始化战斗使用的动画
     */
    private initBattleDragonBones():void{
        var arr:Array<string> = ["zhujue1", "zhujue2", "guaiwu001", "jineng1", "jineng2", "guaiwu002", "guaiwu002_effect", "guaiwu003", "guaiwu003_effect"];
        for(var i:number=0, len:number=arr.length; i<len; i++){
            var dbName:string = arr[i];
            var skeletonData:any = RES.getRes(dbName+"_skeleton_json");
            var texturePng:egret.Texture = RES.getRes(dbName+"_texture_png");
            var textureData:any = RES.getRes(dbName+"_texture_json");
            App.DragonBonesFactory.initArmatureFile(skeletonData, texturePng, textureData);
        }
    }

    /**
     * 初始化所有模块
     */
    private initModule():void{
        //App.ControllerManager.register(ControllerConst.Game, new GameController());
    }
}