/**
 * Created by G510 on 2016/9/14.
 */
exports = module.exports = function () {
    var logout = {};
    logout.addEvent = function ()
    {
        sysCtr.nete.on("10020", function (data) {
            var user = userModel.User;
            var sendProtoClass = sysCtr.protoCtrl.protoRoot.build(sysCtr.protoCtrl.protoJson["10025"]);
            var sendProtoData;
        })
    }
    return logout;
}
