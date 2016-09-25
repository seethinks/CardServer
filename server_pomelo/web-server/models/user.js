/**
 * Created by seethinks on 16/9/25.
 */
//var mongoose = require("mongoose");  //
//var userScheMa = mongoose.Schema;    //  创建模型
//var users = new Schema({
//    account:{type: String, index: true},
//    password:String,
//    nickName:String,
//    money:Number,
//    create_date:{type:Date,default:Date.now()}
//});
//exports.user = mongoose.model('User', userScheMa); //  与users集合关联


var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var userScheMa = new Schema({
    password:String,
    nickName:String,
    money:Number,
    create_date:{type:Date,default:Date.now()}
}); //  定义了一个新的模型，但是此模式还未和users集合有关联
exports.user = mongoose.model('User', userScheMa); //  与users集合关联