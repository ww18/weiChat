/**
 * Created by phoebe on 7/18/16.
 */
'use strict'

var sha1 = require('sha1')
var getReqBody = require('raw-body')
var Wechat = require('./wechat')
var util = require('../libs/util')

module.exports = function(opts, handler){
  var wechat = new Wechat(opts)

  return function* (next){
    //console.log(this.query)
    var that = this
    var token = opts.token
    var signature = this.query.signature
    var nonce = this.query.nonce
    var timestamp = this.query.timestamp
    var echostr = this.query.echostr
    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)

    if(this.method === "GET"){
      if(sha === signature){
        console.log(echostr)
        this.body = echostr + ''
      }else{
        this.body = 'wrong'
      }
    }else if(this.method === "POST"){
      if(sha !== signature){
        this.body = 'wrong'
        return false
      }
      var data = yield getReqBody(this.req, {
        "length": this.length,
        "limit": "1mb",
        "encoding": this.charset
      })

      var content = yield util.parseXMLAsync(data)

      var message = util.formatMessage(content.xml)

      this.weixin = message

      yield handler.call(this, next)
      //console.log(this)
      wechat.reply.call(this)

    }


    //this.body = this.query.echo
  }
}

