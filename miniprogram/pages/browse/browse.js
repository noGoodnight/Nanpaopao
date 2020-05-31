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
    missions: [],
    opID: "",
    show: false,
    orderID: "",
    mission: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.setData({
      missions:[],
    })

    wx.login({
      //获取code
      success: function (res) {
        const db = wx.cloud.database()
        var code = res.code; //返回code
        console.log(code)
        wx.cloud.callFunction({
          name: 'login', data: { code: code },
          success: function (res) {
            console.log(res)
            let openID = res.result.userInfo.openId
            _this.setData({
              opID: openID
            })
            db.collection('orders').get({
              success: function (res) {
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].isFinished == false && res.data[i].pullerId == "null" && res.data[i].pusherID != _this.data.opID) {
                    _this.data.missions.push(res.data[i])
                  }
                }
                let tmpMissions = _this.data.missions
                _this.setData({
                  missions: tmpMissions,
                })
                console.log(_this.data.missions.length)
                console.log(_this.data.opID)
              }
            })
          },
          fail: console.error
        })
      }
    })
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

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  setOid(e) {
    const db = wx.cloud.database()
    let temp
    for(var i = 0;i<this.data.missions.length;i++){
      if(this.data.missions[i]._id == e.currentTarget.dataset.oid){
        temp = this.data.missions[i]
        break
      }
    }
    this.setData({
      orderID: e.currentTarget.dataset.oid,
      mission: temp,
    })
    console.log(this.data.mission.title)
    console.log(this.data.orderID)
    this.showPopup()
  },

  confirm(e){
    const db = wx.cloud.database()
    db.collection('orders').doc(this.data.orderID).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        pullerId: this.data.opID
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    this.onClose()
    this.onHide()
    this.onLoad()
  },
})