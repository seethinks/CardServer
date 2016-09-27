var pomelo = require('pomelo');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'server_pomelo');

var dbm = require("../game-server/app/dao/DbManager")();
dbm.setup();

// app configuration
app.configure('production|development', 'connector', function(){
    app.set('connectorConfig',
        {
            connector : pomelo.connectors.hybridconnector,
            heartbeat : 3,
            useDict : true,
            useProtobuf : true
        });
});


app.configure('production|development', 'gate', function() {
    app.set('connectorConfig',
        {
            connector: pomelo.connectors.hybridconnector,
            useProtobuf: false
        });
    dbm.dbcon.on("success",function(){
        dbm.createZone();
    })
});

//app.configure('production|development', 'lobby', function() {
//    app.set('connectorConfig',
//        {
//            connector : pomelo.connectors.hybridconnector,
//            useProtobuf: true
//        });
//    dbm.dbcon.on("success",function(){
//        dbm.createZone();
//    })
//});

// start app
app.start();

process.on('uncaughtException', function (err) {
    console.error(' Caught exception: ' + err.stack);
});
