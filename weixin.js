/**
 * Created by phoebe on 7/21/16.
 */
'use strict'

var config = require('./config')
var Wechat = require('./weichat/wechat')
var wechatApi = new Wechat(config.wechat)

exports.reply = function* (next) {
  var message = this.weixin

  if(message.MsgType === 'event'){
    if(message.Event === 'subscribe'){
      //if(message.EventKey){
        console.log('扫二维码进来')
      //}
      this.body = '哈哈，你订阅了这个号'
    }else if(message.Event === 'unsubscribe'){
      console.log('无情取关')
      this.body = ''
    }else if(message.Event === 'LOCATION'){
      this.body = '您上报的位置是: ' + message.Latitude + '/'+
          message.longitude + '-' + message.Precision
    }else if(message.Event === 'CLICK'){
      this.body = '您点击了菜单: ' + message.EventKey
    }else if(messsage.Event === 'SCAN'){
      this.body = '看到你扫了一下哦'
    }else if(message.Event === 'VIEW'){
      this.body = '您点击了菜单中的链接: ' + message.EventKey
    }
  }else if(message.MsgType === 'text'){
    var content = message.Content
    var reply = '额, 你说的 ' + message.Content + ' 太复杂了'
    if(content === '1'){
      reply = '天下第一吃大米'
    }else if(content === '2'){
      reply = '天下第二吃仙丹'
    }else if(content === '3'){
      reply = '天下第三即豆腐'
    }else if(content === '4'){
      reply = [
        {title: '技术改变世界',
          description: '只是各煎熟而已'
        }
      ]
    }else if(content === '5'){
      var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg')
      reply = {
        type: 'image',
        mediaId: data.media_id
      }
    }
    this.body = reply
  }

  yield next
}