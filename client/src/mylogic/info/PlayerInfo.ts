class PlayerInfo {
    private _account:string = "";
    private _userID:number = 0;
    private _playerName:string;  // 昵称
    private _levelName:string;
    private _levelID:number = 0;

    private _isGM:boolean = false;
    private _isZB:boolean = false;

    private _sign:string;
    private _cookie:string;

    private _roleId:number = 0
    private _chairNo:number = 0;
    private _gameStatus:number;


    public constructor() {

    }

    public get account():string {
        return this._account;
    }

    public set account(value:string) {
        if (!value) return;
        this._account = value;
    }

    public get chairNo():number {
        return this._chairNo;
    }

    public set chairNo(value:number) {
        this._chairNo = value;
    }

    public get roleId():number {
        return this._roleId;
    }

    public set userID(value:number) {
        if (!value) return;
        this._userID = value;
    }

    public get userID():number {
        return this._userID;
    }


    /**
     * 玩家名称
     */
    public get playerName():string {
        return this._playerName;
    }

    public get levelName():string {
        return this._levelName;
    }

    public set levelName(value:string) {
        if (!value) return;
        this._levelName = value;
    }

    public get levelID():number {
        return this._levelID;
    }

    public set levelID(value:number) {
        this._levelID = value;
    }

    public  get isGM():boolean {
          return this._isGM;
    }

    public  set isGM(value:boolean){
         this._isGM = value;
    }

    public get isZB():boolean {
        return this._isZB;
    }

    public set isZB(value:boolean) {
        this._isZB = value;
    }

    public get sign():string {
        return this._sign;
    }

    public set sign(value:string) {
        this._sign = value;
    }

    public set roleId(value:number) {
        this._roleId = value;
    }

    public set playerName(value:string) {
        this._playerName = value;
    }

    public get gameStatus():number {
        return this._gameStatus;
    }

    public set gameStatus(value:number) {
        this._gameStatus = value;
    }


}