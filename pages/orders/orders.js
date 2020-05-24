// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    fb:[
      {name:"拯救大熊猫",disc:"\n求求好心人555"},
      { name: "拯救大熊猫", disc: "\n求求好心人777" },
      { name: "拯救大熊猫", disc: "\n求求好心人999" },
    ],
    rw:[
      {name:"拯救小熊猫",disc: "\n求求好心人444",},
      { name: "拯救小熊猫", disc: "\n求求好心人666", },
      { name: "拯救小熊猫", disc: "\n求求好心人888", },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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