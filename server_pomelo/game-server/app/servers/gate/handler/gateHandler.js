//module.exports = function(app) {
//    return new Handler(app);
//};
//
//var Handler = function(app) {
//    this.app = app;
//};
//
//var handler = Handler.prototype;
//
///**
// * Gate handler that dispatch user to connectors.
// *
// * @param {Object} msg message from client
// * @param {Object} session
// * @param {Function} next next stemp callback
// *
// */
//handler.queryEntry = function(msg, session, next) {
//    var uid = msg.uid;
//    console.log("queryEntry msg:"+msg);
//    if(!uid) {
//        next(null, {code: Code.FAIL});
//        return;
//    }
//
//    var connectors = this.app.getServersByType('connector');
//    if(!connectors || connectors.length === 0) {
//        next(null, {code: Code.GATE.FA_NO_SERVER_AVAILABLE});
//        return;
//    }
//
//    var res = dispatch(uid, connectors);
//    res.host=this.serverId;
//    console.log("res.clientPort:"+res.clientPort);
//    next(null, {code: Code.OK, host: res.host, port: res.clientPort});
//};
//
//function dispatch(uid, connectors) {
//    var index = Number(uid) % connectors.length;
//    return connectors[index];
//}

var Code = require('../../../../../shared/code');
module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

/**
 * Gate handler that dispatch user to connectors.
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next stemp callback
 *
 */
handler.queryEntry = function(msg, session, next) {
    var uid = msg.uid;
    console.log("queryEntry msg:"+msg);
    if(!uid) {
        next(null, {code: Code.FAIL});
        return;
    }

    var connectors = this.app.getServersByType('connector');
    if(!connectors || connectors.length === 0) {
        next(null, {code: Code.GATE.FA_NO_SERVER_AVAILABLE});
        return;
    }
    //var res = dispatch(uid, connectors);
    var res = connectors[0];
    next(null, {code: Code.OK, host: res.clientHost, port: res.clientPort});
};

function dispatch(uid, connectors) {
    var index = Number(uid) % connectors.length;
    return connectors[index];
}