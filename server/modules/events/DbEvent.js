/**
 * Created by G510 on 2016/9/8.
 */
exports = module.exports = function()
{
    var events = require("events");
//实例化events.EventEmitter对象
    var dbEvent = new events.EventEmitter();
    dbEvent.EN_CONNECTED = "en_connected";
    return dbEvent;
}
