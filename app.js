/**
 * Created by phoebe on 7/15/16.
 */
'use strict'
var Koa = require('koa')
var path = require('path')
var wechat = require('./weichat/g')
var weixin = require('./weichat/weixin')
var util = require('./libs/util')
var config = require('./config')
var wechat_file = path.join(__dirname, './config/wechat.txt')

var app = new Koa()

app.use(wechat(config.wechat, weixin.reply))

app.listen(1234)
console.log('Listening:1234')