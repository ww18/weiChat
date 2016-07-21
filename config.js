/**
 * Created by phoebe on 7/21/16.
 */
var path = require('path')
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


module.exports = config