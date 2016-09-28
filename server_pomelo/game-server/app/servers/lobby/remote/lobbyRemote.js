var zoneDao = require('../../../dao/zoneDao');

module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
    this.app = app;
    var session = app.get('session') || {};
};

var pro = Remote.prototype;


pro.enterZone = function(zoneID, uid, callback) {
    zoneDao.enterZone(zoneID, uid, callback);
};

pro.leaveZone = function(zoneID, uid, callback) {
    zoneDao.leaveZone(zoneID, uid, callback);
};



