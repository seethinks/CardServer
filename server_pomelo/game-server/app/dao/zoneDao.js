var async = require('async');
var zoneModel = require("../dao/models/Zone");
var utils = require('../util/utils');
var Code = require('../../../shared/code');

var userDao = module.exports;


// ------------------------------------------------------------------------ have zone
userDao.createZone = function(zid,cb)
{
    var zone = zoneModel.Zone;
    var queryDoc = {id: zid};
    zone.count(queryDoc, function (err, doc) {
        if (err) {
            console.log("create zone err:"+err+"   zid:"+zid);
            utils.invokeCallback(cb, null, err);
        } else {
            if (doc == 0) {
                var zoneData = new zone({
                    id: zid,
                    onlineCount: 0,
                    name: "泰格星球"
                });
                zoneData.save(function (err) {
                    if (err) {
                        console.log("create zone err:"+err+"   zid:"+zid);
                        utils.invokeCallback(cb, null, err);
                    } else {
                        console.log("create zone success:"+"   zid:"+zid);
                        utils.invokeCallback(cb, null, Code.OK);
                    }
                })
            } else {
                console.log("create zone err:"+Code.ZONE.FA_ALREADY_EXIST+"   zid:"+zid);
                utils.invokeCallback(cb, null, Code.ZONE.FA_ALREADY_EXIST);
            }
        }
    })
}

userDao.enterZone = function(zoneID,uid, cb)
{
    var zone = zoneModel.Zone;
    var queryDoc = {id: zid};
    zone.count(queryDoc, function (err, doc) {
        if (err) {
            console.log("enterZone err:"+err+"   zid:"+zid);
            utils.invokeCallback(cb, null, err);
        } else {
            if (doc == 0) {
                console.log("this zone no exist:"+Code.ZONE.FA_NOT_EXIST+"   zid:"+zid);
                utils.invokeCallback(cb, null, Code.ZONE.FA_NOT_EXIST);
            }else
            {
                console.log("doc.id):"+doc.id);
                utils.invokeCallback(cb, null, Code.OK);
            }
        }
    })
    utils.invokeCallback(cb, null, Code.OK);
}

userDao.updateZoneOnlineCount = function(type,id)
{
    var zone = zoneModel.Zone;
    if(type == "enter")
    {
        zone.update({"id":id},{"onlineCount":200})
    }

}

