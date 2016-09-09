/**
 * Created by G510 on 2016/8/30.
 */
var express = require("express");
var router = express.Router();

router.get("/",function(rep,res,next){
    res.render('bs01');
})
module.exports = router;