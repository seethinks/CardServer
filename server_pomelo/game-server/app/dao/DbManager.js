/**
 * Created by G510 on 2016/9/13.
 */
var zoneDao = require('../../app/dao/zoneDao');
var async = require('async');

exports = module.exports = function () {
    var dbManager = {};
    var mongoose = require('mongoose');
    dbcon = mongoose.connection;
    dbManager.dbcon = dbcon;
    var isSetup = false;

    dbManager.setup = function()
    {
        if (isSetup) return;
        isSetup = true;
        var recon =true;
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGO || 'mongodb://127.0.0.1/cardServer');


        dbcon.on('error',function(error){
            console.log('connection error');
            dbcon.close();
        });

        dbcon.on('disconnected',function(){
            console.log('disconnected');
            dbcon.close();
        });
        dbcon.on('open',function(){
            console.log('mongo connection success open ->');
            //dbManager.emit("en_connected");
            recon =true;
            dbcon.emit("success")
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

    dbManager.createZone = function()
    {
        async.series([
            function (cb)
            {
                zoneDao.createZone(1000,cb);
            },
            function (cb)
            {
                zoneDao.createZone(1001,cb);
            },
            function (cb)
            {
                zoneDao.createZone(1002,cb);
            }
        ],function(err){
            if (err) {
                console.log("Create zone err:"+err);
                return;
            }
            console.log("Create zone success.");
        });
    }

    return dbManager;
}
