var Code = require('../../../../../shared/code');
var async = require('async');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};


Handler.prototype.login = function(msg, session, next) {
    var self = this;
    var token;
    var resData;
    async.waterfall([
            function(cb) {
                // auth token
                self.app.rpc.auth.authRemote.Login(session, msg.account, msg.pass, cb);
            },
            function(code, rd,  cb) {
                if (code != Code.OK) {
                    next(null, {code: code});
                    return;
                }
                resData = rd
                token = resData.token;
                session.set('token', token);
                session.set('uid', uid);
                session.bind(token, cb);
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


Handler.prototype.entry = function(msg, session, next)
{

}

