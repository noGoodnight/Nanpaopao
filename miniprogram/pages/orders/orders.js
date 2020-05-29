// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    myNickName:"",
    fb:[],
    rw:[],
    myOpenId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    
    wx.cloud.init({
      env: 'test-g55yu',
      traceUser: true,
    })
    wx.getUserInfo({
      success: res => {
        let nickName = res.userInfo.nickName
        _this.setData({
          myNickName: nickName
        });
      }
    })
    console.log(_this.myNickName)
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        wx.cloud.callFunction({ name: 'login', data: { code: code }, 
          success: (res) =>{
          let openID = res.result.userInfo.openId
          
          _this.setData({
              myOpenId: openID
          })
            const db = wx.cloud.database()
            db.collection('targets').get({
              success: function (res) {
                console.log(res.data.length)
                for (var i = 0; i < res.data.length; i++) {
                  console.log(res.data[i].pusherId)
                  console.log(_this.data.myOpenId)
                  if (res.data[i].pusherId == _this.data.myOpenId) {
                    _this.data.fb.push(res.data[i])
                  }
                  if (res.data[i].pullerId == _this.data.myOpenId) {
                    _this.data.rw.push(res.data[i])
                  }
                }
                let tmpfb = _this.data.fb
                let tmprw = _this.data.rw
                _this.setData({
                  fb: tmpfb,
                  rw: tmprw
                })
              }
            })
            }, 
           fail: console.error })
      }
    })
    
    
    
    if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(res)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
            active: 2
        });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onChange(event) {
    console.log(event);
    wx.showToast({
      title: ` ${event.detail.title}`,
      icon: 'none',
    });
    this.setData({ active: event.detail });
  },
})