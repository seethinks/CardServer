/**
 * Created by yangsong on 2014/11/28.
 */
var SceneConsts;
(function (SceneConsts) {
    /**
     * Game场景
     * @type {number}
     */
    SceneConsts[SceneConsts["GameMain"] = 1] = "GameMain";
    /**
     * 游戏场景
     * @type {number}
     */
    SceneConsts[SceneConsts["UI"] = 2] = "UI";
    /**
     * Loading场景
     * @type {number}
     */
    SceneConsts[SceneConsts["LOADING"] = 3] = "LOADING";
    /**
     * Login场景
     * @type {number}
     */
    SceneConsts[SceneConsts["Login"] = 4] = "Login";
    /**
     * Reg场景
     * @type {number}
     */
    SceneConsts[SceneConsts["Reg"] = 5] = "Reg";
    SceneConsts[SceneConsts["Zone1"] = 6] = "Zone1";
})(SceneConsts || (SceneConsts = {}));
