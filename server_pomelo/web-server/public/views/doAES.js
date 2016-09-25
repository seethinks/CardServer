/**
 * Created by G510 on 2016/9/21.
 */
var crypto = require("crypto");

var doAES = module.exports;



/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为32位私钥
 * @returns {string}
 */
doAES.encryption = function (data, _id, iv) {
    var key1 = _id.toString().substr(0,8);
    var key = _id + key1;
    iv = iv || "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
}

/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为32位私钥
 * @returns {string}
 */
doAES.decryption = function (data, _id, iv) {
    if (!data) {
        return "";
    }
    var key1 = _id.toString().substr(0,8);
    var key = _id + key1;
    iv = iv || "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));
    return cipherChunks.join('');
}


