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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.cloud.init({
      env: 'nanpaopao-po4ge',
      traceUser: true,
    })
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo)
        let nickName = res.userInfo.nickName
        _this.setData({
          myNickName: nickName
        });
      }
    })
    const db = wx.cloud.database()
    db.collection('targets').get({
      success: function (res) {
        console.log(res.data.length)
        for (var i = 0; i < res.data.length;i++){
          console.log(res.data[i])
          if(res.data[i].pusher==_this.data.myNickName){
            _this.data.fb.push(res.data[i])
          }
          if(res.data[i].puller==_this.data.myNickName){
            _this.data.rw.push(res.data[i])
          }
        }
        let tmpfb = _this.data.fb
        let tmprw = _this.data.rw
        _this.setData({
          fb:tmpfb,
          rw:tmprw
        })
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