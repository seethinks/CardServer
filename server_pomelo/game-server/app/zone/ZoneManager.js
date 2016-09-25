/**
 * Created by G510 on 2016/9/13.
 */
var userDao = require('../../app/dao/userDao');
exports = module.exports = function () {
    var zoneManager = {};

    var roomList = {};

    var userList = {};

    var mongoose = require('mongoose');

    zoneManager.setup = function()
    {

    }

    zoneManager.enterUser = function(user)
    {

    }

    zoneManager.leaveUser = function(user)
    {

    }

    zoneManager.updateZoneOnlineCount = function(type,id)
    {
            userDao.updateZoneOnlineCount(type,id)
    }

    return zoneManager;
}
