var async = require('async');
var zoneModel = require("../dao/models/Zone");
var utils = require('../util/utils');
var Code = require('../../../shared/code');
var redis = require("redis");
var client = redis.createClient();

var zoneDao = module.exports;

// ------------------------------------------------------------------------ have zone
zoneDao.createZone = function(zid,cb)
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

zoneDao.enterZone = function(zoneID,uid, cb)
{
    var zone = zoneModel.Zone;
    var queryDoc = {id: zoneID};
    zone.update(queryDoc, {$addToSet: {"uidList": uid}}, function(err) {
        if (err)
        {
            console.log("enter zone  add user err   zid:"+zid);
            utils.invokeCallback(cb, null, err);
        }
    });
    zone.aggregate([{$match:{id:parseInt(zoneID)}},{$project: { zoneID: "$id",count: { $size:"$uidList" }}}],function(e,res){
        if(e)
        {
            console.log("error:"+e);
            utils.invokeCallback(cb, null, Code.FAIL);
        }else
        {
            utils.invokeCallback(cb, null, Code.OK,res);
        }
    })

}

zoneDao.updateZoneOnlineCount = function(type,id)
{
    var zone = zoneModel.Zone;
    if(type == "enter")
    {
        zone.update({"id":id},{"onlineCount":200})
    }

}

