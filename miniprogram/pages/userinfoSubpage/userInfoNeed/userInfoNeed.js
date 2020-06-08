// pages/userInfoFile/index.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    missions: [],
    opID: '',
    orderId: '',
    mission: null,
    active: 0,
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    // let value1 = this.data.value1
    // let value2 = this.data.value2
    // let value = this.data.value
    _this.setData({
      missions: [],
      opID: app.globalData.openId
    })

    db.collection('orders').get({
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          var add = false
          if (res.data[i].isFinished == true) {
            if (res.data[i].pullerId == _this.data.opID) {
              add = true
            }
            if (add) {
              _this.data.missions.push(res.data[i])
            }
          }
          let temp=_this.data.missions
          _this.setData({
            missions:temp
          })
        }
        
      }
    })
    
  },

  setMission(e) {
    let temp = null
    for (var i = 0; i < this.data.missions.length; i++) {
      if (this.data.missions[i]._id == e.currentTarget.dataset.oid) {
        temp = this.data.missions[i]
        break
      }
    }
    this.setData({
      mission: temp,
      show: true,
    })
  },
  onClose() {
    this.setData({
      show: false,
    })
  },
  onChange(event) {
    console.log(event);
    wx.showToast({
      title: ` ${event.detail.title}`,
      icon: 'none',
    });
    this.setData({
      active: event.detail
    });
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
        active: 3
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

  }
})