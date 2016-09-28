var Code = require('../../../../../shared/code');
var async = require('async');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

Handler.prototype.reg = function(msg, session, next) {
    var self = this;
    async.waterfall([
            function(cb) {
                // auth token
                self.app.rpc.auth.authRemote.Reg(session, msg.account, msg.pass, cb);
            },
            function(code, cb) {
                if (code != Code.OK) {
                    next(null, {code: code});
                    return;
                }
                next(null, {code: Code.OK});
            }
        ],
        function(err) {
            if (err) {
                next(err, {code: Code.FAIL});
                return;
            }
            next(null, {code: Code.OK});
        });
}

Handler.prototype.login = function(msg, session, next) {
    var self = this;
    var resData;
    async.waterfall([
            function(cb) {
                // auth token
                self.app.rpc.auth.authRemote.Login(session, msg.uid, cb);
            },
            function(code, rd,  cb) {
                if (code != Code.OK) {
                    next(null, {code: code});
                    return;
                }
                resData = rd
                var sessionService = self.app.get('sessionService');
                if(!session.get("uid")) {
                    session.set('uid', msg.uid);
                    session.bind(msg.uid, cb);
                    session.on('closed', onPlayerLeave.bind(null, self.app));
                    session.pushAll(cb);
                }else
                {
                    next(null, {code: Code.ENTRY.FA_USER_ALREADY_LOGIN});
                }
            }
        ],
        function(err) {
            if (err) {
                next(err, {code: Code.FAIL});
                return;
            }
            next(null, {code: Code.OK,msg:resData});
        });
};

/**
 * 用户离开 - 如刷新页面操作
 * @param app
 * @param session
 */
var onPlayerLeave = function(app, session) {
    if(!session || !session.uid) {
        return;
    }
    console.log('user leave: ' + session.uid);

    app.rpc.auth.authRemote.userLeave(session, session.uid, function(err) {
        if (err != null) {
            console.log(err);
        }
    });
};

// ------------------------------------------------------------------ Zone

Handler.prototype.enterZone = function(msg, session, next)
{
    var zoneID = msg.zoneID;
    if(!session || !session.uid) {
        return;
    }
    var self = this;
    var resData;
    async.waterfall([
        function(cb) {
            self.app.rpc.lobby.lobbyRemote.enterZone(session,zoneID, msg.uid,cb);
        },
        function(code, rd) {
            if (code != Code.OK) {
                next(null, {code: code});
                return;
            }
            resData = rd;
            next(null, {code: Code.OK,msg:resData});
        }
    ], function(err) {
        if (err) {
            next(err, {code: Code.FAIL});
            return;
        }
        next(null, {code: Code.OK,msg:resData});
    });
}

