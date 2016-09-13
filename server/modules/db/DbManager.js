/**
 * Created by G510 on 2016/9/13.
 */

exports = module.exports = function () {
    var dbManager = {};
    var mongoose = require('mongoose');

    dbManager.setup = function()
    {
        var recon =true;

        mongoose.connect(process.env.MONGO || 'mongodb://127.0.0.1/cardServer');
        var dbcon = mongoose.connection;
        dbcon.on('error',function(error){
            console.log('connection error');
            dbcon.close();
        });

        dbcon.on('disconnected',function(){
            console.log('disconnected');
            dbcon.close();
        });
        dbcon.on('open',function(){
            //console.log('connection success open ->");
            sysCtr.dbe.emit(sysCtr.dbe.EN_CONNECTED);
            recon =true;
        });
        //监听关闭事件并重连
        dbcon.on('close',function(err){
            console.log('closed');
            reConnect('*');
        });
        function reConnect(msg){
            console.log('reConnect'+msg);
            if(recon){
//                console.log('reConnect-**');
//                dbcon.open(host, database, port, opts,function(){
//                    console.log('closed-opening');
//                });
//                recon =false;
//                console.log('reConnect-***');
            };
            console.log('reConnect-end');
        }
    }
    return dbManager;
}
