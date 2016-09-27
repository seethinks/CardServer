var PlayerSystem = (function () {
    function PlayerSystem() {
    }
    var d = __define,c=PlayerSystem,p=c.prototype;
    /**
     * 数据中心初始化
     *
     */
    PlayerSystem.setup = function () {
        this._selfPlayerInfo = this.initialInformation();
    };
    PlayerSystem.initialInformation = function () {
        return new PlayerInfo();
    };
    PlayerSystem.init = function () {
    };
    /**
     *
     * @param level 当前级别
     * @return
     *
     */
    PlayerSystem.getLevelUpExp = function (level) {
        if (level === void 0) { level = 0; }
        return 1;
    };
    /**
     * 取得用户角色信息
     * @param userID
     * @return
     *
     */
    PlayerSystem.getPlayerInfo = function (playerID) {
        if (playerID === void 0) { playerID = ""; }
        var info = this._playerList.get(playerID);
        return info ? info : this._selfPlayerInfo;
    };
    /**
     * 更新用户信息
     * @param info 旧的用户信息，如果有
     * @return
     *
     */
    PlayerSystem.updatePlayerInfo = function (info) {
        var oldInfo = this._playerList.get(info.userID);
        this._playerList.set(info.userID, info);
        return oldInfo;
    };
    d(PlayerSystem, "selfPlayerInfo"
        /**
         * 取得玩家自已的信息
         * @return
         *
         */
        ,function () {
            return this._selfPlayerInfo;
        }
    );
    d(PlayerSystem, "playerList"
        /**
         * 缓存用户信息列表
         */
        ,function () {
            return this._playerList;
        }
    );
    /**
     * 删除所有玩家
     */
    PlayerSystem.removePlayers = function () {
        this._playerList.clear();
    };
    return PlayerSystem;
}());
egret.registerClass(PlayerSystem,'PlayerSystem');
