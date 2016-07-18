/**
 * Created by phoebe on 7/15/16.
 */
'use strict'
var Koa = require('koa')
var path = require('path')
var wechat = require('./weichat/g')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt')

var config = {
  wechat: {
    appID: 'wxad531fd6431c2055',
    appSecret: 'df3d93bf8af0e7cb0a56f5077c3af5d2',
    token: 'wenweninitTokenweixin',
    getAccessToken: function(){
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken: function(data){
      data = JSON.stringify(data)
      return util.writeFileAsync(wechat_file, data)
    }
  }
}

var app = new Koa()

app.use(wechat(config.wechat))

app.listen(1234)
console.log('Listening:1234')