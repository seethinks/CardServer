/**
 * Created by seethinks@gmail.com on 2015/8/10.
 */
var HashMap = (function () {
    function HashMap() {
        this.keys = new Array();
        this.values = new Array();
    }
    var d = __define,c=HashMap,p=c.prototype;
    p.clear = function () {
        while (this.keys.length > 0) {
            this.keys.pop();
        }
        while (this.values.length > 0) {
            this.values.pop();
        }
        this.updateSize();
    };
    p.delete = function (key) {
        var result = false;
        var index = this.keys.indexOf(key);
        if (index != -1) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
            this.updateSize();
            result = true;
        }
        return result;
    };
    p.forEach = function (callbackfn, thisArg) {
        var i = 0;
        for (i = 0; i < this.size; i++) {
            callbackfn.call(thisArg, this.values, this.keys, this);
        }
    };
    p.get = function (key) {
        var result = null;
        var index = this.keys.indexOf(key);
        if (index != -1) {
            result = this.values[index];
        }
        return result;
    };
    p.has = function (key) {
        var index = this.keys.indexOf(key);
        return index != -1;
    };
    p.set = function (key, value) {
        this.keys.push(key);
        this.values.push(value);
        this.updateSize();
        return this;
    };
    p.getKey = function (index) {
        return this.keys[index];
    };
    p.updateSize = function () {
        this.size = this.keys.length;
    };
    return HashMap;
}());
egret.registerClass(HashMap,'HashMap');
