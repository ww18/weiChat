/**
 * Created by phoebe on 7/15/16.
 */
'use strict'
var Koa = require('koa');
var sha1 = require('sha1')
var config = {
  wechat: {
    appId: 'wxad531fd6431c2055',
    appSecret: 'df3d93bf8af0e7cb0a56f5077c3af5d2',
    token: 'wenweninitTokenweixin'
  }
}

var app = new Koa()

app.use(function *(next){
  console.log(this.query)

  var token = config.wechat.token
  var signature = this.query.signature
  var nonce = this.query.nonce
  var timestamp = this.query.timestamp
  var echostr = this.query.echostr
  var str = [token, timestamp, nonce].sort().join('')
  var sha = sha1(str)

  if(sha === signature){
    this.body = echostr + ''
  }else{
    this.body = 'wrong'
  }

  this.body = this.query.echo
})

app.listen(1234)
console.log('Listening:1234')