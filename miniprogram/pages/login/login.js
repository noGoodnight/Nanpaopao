//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: '欢迎来到南跑跑',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.intoApp();
    } 
    else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.intoApp()
      }
    } 
    else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      },)
    }
},
  getUserInfo: function(e) {
    if(e.detail.userInfo){
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      this.intoApp();
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请授权后再使用小程序',
        showCancel: false,
        confirmText: '确定',
        success: function(res) {
            if (res.confirm) {
                console.log('用户拒绝了授权');
            }
        }
      });
    }
  },
  bindViewTap: function() {
    wx.switchTab({
      url: '/pages/browse/browse'
    })
  },
  intoApp: function(){
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getOpenId',
      // 传递给云函数的event参数
      data: {
      }
    }).then(res => {
      //console.log(res)
      app.globalData.openId = res.result.openid
      //console.log(app.globalData.openId)
    }).catch(err => {
      console.log(err)
    })
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'checkAuthentication',
      // 传递给云函数的event参数
      data: {
      }
    }).then(res => {
      app.globalData.isAuthenticated = res.result
      if(app.globalData.isAuthenticated){//必须要在认证信息获得过后才能继续获取（这里可以只调用一个函数的，算了懒得改了）
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'getUser',
          // 传递给云函数的event参数
          data: {
          }
        }).then(res => {
          app.globalData.userName = res.result[0].userName,
          app.globalData.studentId = res.result[0].studentId
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/browse/browse',
      })}
      , 2000)
    }
  }
);