var PlayerInfo = (function () {
    function PlayerInfo() {
        this._account = "";
        this._userID = "";
        this._levelID = 0;
        this._isGM = false;
        this._isZB = false;
        this._roleId = 0;
        this._chairNo = 0;
        this._zoneID = 0;
    }
    var d = __define,c=PlayerInfo,p=c.prototype;
    d(p, "account"
        ,function () {
            return this._account;
        }
        ,function (value) {
            if (!value)
                return;
            this._account = value;
        }
    );
    d(p, "chairNo"
        ,function () {
            return this._chairNo;
        }
        ,function (value) {
            this._chairNo = value;
        }
    );
    d(p, "roleId"
        ,function () {
            return this._roleId;
        }
        ,function (value) {
            this._roleId = value;
        }
    );
    d(p, "userID"
        ,function () {
            return this._userID;
        }
        ,function (value) {
            if (!value)
                return;
            this._userID = value;
        }
    );
    d(p, "zoneID"
        ,function () {
            return this._zoneID;
        }
        ,function (value) {
            if (!value)
                return;
            this._zoneID = value;
        }
    );
    d(p, "playerName"
        /**
         * 玩家名称
         */
        ,function () {
            return this._playerName;
        }
        ,function (value) {
            this._playerName = value;
        }
    );
    d(p, "levelName"
        ,function () {
            return this._levelName;
        }
        ,function (value) {
            if (!value)
                return;
            this._levelName = value;
        }
    );
    d(p, "levelID"
        ,function () {
            return this._levelID;
        }
        ,function (value) {
            this._levelID = value;
        }
    );
    d(p, "isGM"
        ,function () {
            return this._isGM;
        }
        ,function (value) {
            this._isGM = value;
        }
    );
    d(p, "isZB"
        ,function () {
            return this._isZB;
        }
        ,function (value) {
            this._isZB = value;
        }
    );
    d(p, "sign"
        ,function () {
            return this._sign;
        }
        ,function (value) {
            this._sign = value;
        }
    );
    d(p, "gameStatus"
        ,function () {
            return this._gameStatus;
        }
        ,function (value) {
            this._gameStatus = value;
        }
    );
    return PlayerInfo;
}());
egret.registerClass(PlayerInfo,'PlayerInfo');
