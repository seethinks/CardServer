/**
 * Created by G510 on 2016/9/13.
 */
// 此配置文件适合多人合作设置各自不同环境的配置信息
var env      = 'dev'; // dev or product
var devloper = 'one man'; // 开发者：defaults,your name，默认是系统默认的配置，开发者名字按照各自环境配置自己的配置文件信息,适合多人合作情况
var http     = 'http://'; //http:// or https://

var settings = {
    base: {
        appName: "CardServer",
        version: "0.0.1",
        env: env,
        desc:'基本配置'
    },
    dev: {
        defaults: {
            hostname: {
                host: "127.0.0.1",
                port: 3000
            },
            mongodb: {
                host: "localhost",
                port: "27017",
                dbname: "cardServer",
                username: "",
                password: ""
            },
            socket:{
                host:"127.0.0.1",
                prot:3008
            }
        },
        desc:'开发环境配置'
    },
    product: {
        hostname: {
            host: "https://www.baidu.com",
            port: 80
        },
        mongodb: {
            host: "",
            port: "",
            name: "cardServer",
            username: "",
            password: ""
        },
        socket:{
            host:"127.0.0.1",
            prot:3008
        },
        desc: '网站发布地址配置'
    }
}