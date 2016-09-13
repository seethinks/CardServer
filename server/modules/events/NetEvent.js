/**
 * Created by G510 on 2016/9/8.
 */
exports = module.exports = function()
{
    var events = require("events");
//实例化events.EventEmitter对象
    var netEvent = new events.EventEmitter();
    return netEvent;
}
