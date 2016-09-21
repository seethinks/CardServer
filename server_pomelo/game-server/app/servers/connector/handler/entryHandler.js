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
    var uid, auth;
    async.waterfall([
            function(cb) {
                // auth token
                self.app.rpc.auth.authRemote.Login(session, msg.account, msg.pass, cb);
            },
            function(code, doc,  cb) {
                if (code != Code.OK) {
                    next(null, {code: code });
                    return;
                }
                uid = doc._id;
                session.set('authority', uid);
                session.bind(uid, cb);
            }
        ],
        function(err) {
            if (err) {
                next(err, {code: Code.FAIL});
                return;
            }
            next(null, {code: Code.OK});
        });
};

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
    var result = {
        topic: 'publish',
        payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
    };
    next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
    var result = {
        topic: 'subscribe',
        payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
    };
    next(null, result);
};
