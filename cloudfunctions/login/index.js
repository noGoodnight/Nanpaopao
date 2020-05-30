'use strict';

const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-g55yu',
  traceUser: true,
})

const db = cloud.database();

exports.main = (event, context, callback) => {
  const wxContext = cloud.getWXContext()
    //获取code
      var code = event.code; //返回code
      console.log(code);
  var appId = 'wxebff223895668861';
  var secret = '5f9dc17546efa7aebfbfcab2fe37d59d';
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
        data: {},
        header: {
          'content-type': 'json'
        },
        success: function (res) {
          var openid1 = res.data.openid //返回openid
          console.log('openid为' + openid1);
        }
      })
  return {
    openid1: openid1
  }
};
