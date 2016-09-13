var fs= require('fs');
fs.readFile("../server/modules/config.js",function(err,data) {
    if (err) {
        console.log(err)
        throw err;
    }
    //var jsonObj = JSON.parse(data);
    sysCtr = require("./system/SystemCenter")();;
    sysCtr.init({});
    console.log("start read config data ...")
});








