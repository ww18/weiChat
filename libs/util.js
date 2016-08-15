/**
 * Created by phoebe on 7/18/16.
 */
'use strict'

var fs = require('fs')
var Promise = require('bluebird')
var xml2js = require('xml2js')
var tpl = require('../weichat/temp')

exports.readFileAsync = function(fpath, encoding){
  return new Promise(function(resole, reject){
    fs.readFile(fpath, encoding, function(err, content){
      if(err) reject(err)
      else resole(content)
    })
  })
}
exports.writeFileAsync = function(fpath, content){
  return new Promise(function(resolve, reject){
    fs.writeFile(fpath, content, function(err, content){
      if(err) reject(err)
      else resolve()
    })
  })
}

exports.parseXMLAsync = function(xml){
  return new Promise(function(resolve, reject){
    xml2js.parseString(xml, {trim:true}, function(err, content){
      if(err) reject(err)
      else resolve(content)
    })
  })
}

function formatMessage(result){
  var message = {}
  if(typeof result === 'object'){
    var keys = Object.keys(result)
    for(var i = 0; i < keys.length; i++){
      var item = result[keys[i]]
      var key = keys[i]
      if(!(item instanceof Array) || item.length === 0){
        continue
      }
      if(item.length === 1){
        var val = item[0]
        if(typeof val === 'object'){
          message[key] = formatMessage(val)
        }else{
          message[key] = (val || '').trim()
        }
      }else{
        message[key] = []
        for(var j = 0; j < item.length; j++){
          message[key].push(formatMessage(item[j]))
        }
      }
    }
  }
  return message
}

exports.formatMessage = formatMessage

exports.tpl = function(content, message){
  var info = {}
  var type = 'text'
  var fromUserName = message.FromUserName
  var toUserName = message.ToUserName

  if(Array.isArray(content)){
    type = 'news'
  }

  type = message.type || type
  info.content = content
  info.createTime = new Date().getTime()
  info.msgType = type
  info.toUserName = toUserName
  info.fromUserName = fromUserName

  return tpl.compiled(info)

}