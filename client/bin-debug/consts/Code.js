var Code = (function () {
    function Code() {
    }
    var d = __define,c=Code,p=c.prototype;
    Code.OK = 200;
    Code.FAIL = 500;
    Code.ENTRY = {
        FA_TOKEN_INVALID: 1001,
        FA_TOKEN_EXPIRE: 1002,
        FA_USER_NOT_EXIST: 1003,
        FA_USER_ALREADY_LOGIN: 1004,
        FA_USER_PWD_ERROR: 1005
    };
    Code.GATE = {
        FA_NO_SERVER_AVAILABLE: 2001
    };
    return Code;
}());
egret.registerClass(Code,'Code');
;
