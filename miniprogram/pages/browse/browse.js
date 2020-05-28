// pages/browse/browse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    option1: [{
        text: "全部起点",
        value: 0
      },
      {
        text: "仙林",
        value: 1
      },
      {
        text: "鼓楼",
        value: "2"
      }
    ],
    option2: [{
        text: "全部终点",
        value: 0
      },
      {
        text: "仙林",
        value: 1
      },
      {
        text: "鼓楼",
        value: "2"
      }
    ],
    value1: 0,
    value2: 0,
    mission: [{
        start: "仙林",
        end: "仙林",
        ableToView: true,
      },
      {
        start: "仙林",
        end: "鼓楼",
        ableToView: true,
      },
      {
        start: "鼓楼",
        end: "鼓楼",
        ableToView: true,
      },
      {
        start: "鼓楼",
        end: "仙林",
        ableToView: true,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData();
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
        active: 0
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

  onSearch() {
    var value = this.data.value;
    if (value == "") {
      for (var i = 0; i < this.data.mission.length; i++) {
        this.data.mission[i].ableToView = true;
        console.log(this.data.mission[i].ableToView);
      }
    } else {
      for (var i = 0; i < this.data.mission.length; i++) {
        if (this.data.mission[i].start == value || this.data.mission[i].end == value) {
          this.data.mission[i].ableToView = true;
        } else {
          this.data.mission[i].ableToView = false;
        }
        console.log(this.data.mission[i].ableToView);
      }
    }
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    })
    console.log(this.data.value);
  },

  onClick() {
    this.onSearch();
    this.onShow();
  },
})