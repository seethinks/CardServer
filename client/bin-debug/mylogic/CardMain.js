/**
 * Created by yangsong on 15-3-27.
 * ActDemo
 */
var CardMain = (function () {
    function CardMain() {
        var groupName = "preload";
        var subGroups = ["preload_core"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }
    var d = __define,c=CardMain,p=c.prototype;
    /**
     * 资源组加载完成
     */
    p.onResourceLoadComplete = function () {
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
    };
    /**
     * 资源组加载进度
     */
    p.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    };
    /**
     * 初始化战斗使用的动画
     */
    p.initBattleDragonBones = function () {
        var arr = ["zhujue1", "zhujue2", "guaiwu001", "jineng1", "jineng2", "guaiwu002", "guaiwu002_effect", "guaiwu003", "guaiwu003_effect"];
        for (var i = 0, len = arr.length; i < len; i++) {
            var dbName = arr[i];
            var skeletonData = RES.getRes(dbName + "_skeleton_json");
            var texturePng = RES.getRes(dbName + "_texture_png");
            var textureData = RES.getRes(dbName + "_texture_json");
            App.DragonBonesFactory.initArmatureFile(skeletonData, texturePng, textureData);
        }
    };
    /**
     * 初始化所有模块
     */
    p.initModule = function () {
        //App.ControllerManager.register(ControllerConst.Game, new GameController());
    };
    return CardMain;
}());
egret.registerClass(CardMain,'CardMain');
