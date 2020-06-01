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
    firstLoad: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let value1 = this.data.value1
    let value2 = this.data.value2
    _this.setData({
      missions:[] //防止出现重复
    })

    wx.login({
      //获取code
      success: function (res) {
        const db = wx.cloud.database()
        var code = res.code; //返回code
        wx.cloud.callFunction({
          name: 'login', data: { code: code },
          success: function (res) {
            let openID = res.result.userInfo.openId
            _this.setData({
              opID: openID
            })
            db.collection('orders').get({
              success: function (res) {
                for (var i = 0; i < res.data.length; i++) {
                  var toAdd = true
                  if (res.data[i].isFinished == false && res.data[i].pullerId == "null") {
                    if (value1 != 0 && res.data[i].start != _this.data.option1[value1].text) {
                      console.log(res.data[i].start)
                      console.log(_this.data.option1[value1].text)
                      toAdd = false
                    }
                    if (toAdd) {
                      if (value2 != 0 && res.data[i].end != _this.data.option2[value2].text) {
                        toAdd = false
                      }
                    }
                    if (toAdd) {
                      _this.data.missions.push(res.data[i])
                    }
                  }
                }
                let tmpMissions = _this.data.missions
                _this.setData({
                  missions: tmpMissions,
                })
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

    if (!this.data.firstLoad) {
      this.onLoad()
    } else {
      this.setData({
        firstLoad: false
      })
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
    let temp = null
    let str = ""
    for (var i = 0; i < this.data.missions.length; i++) {
      if (this.data.missions[i]._id == e.currentTarget.dataset.oid) {
        temp = this.data.missions[i]
        break
      }
    }
    str = temp.ddl
    temp.ddl = this.splitDate(temp.ddl)
    this.setData({
      orderID: e.currentTarget.dataset.oid,
      mission: temp,
    })
    temp.ddl = str
    console.log(this.data.mission.title)
    console.log(this.data.orderID)
    this.showPopup()
  },

  confirm(e) {
    const db = wx.cloud.database()
    db.collection('orders').doc(this.data.orderID).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        pullerId: this.data.opID
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    this.onClose()
    this.onShow()
  },

  splitDate(String) {
    var a = String.split("-");
    var output = "";
    output = output + a[0] + "年" + a[1] + "月";
    var b = a[2].split(" ");
    output = output + b[0] + "日";
    var c = b[1].split(":");
    output = output + c[0] + "时" + c[1] + "分";
    return output;
  },

  switchStart(e) {
    console.log(e.detail)
    this.setData({
      value1: e.detail
    })
    this.onShow()
  },

  switchEnd(e) {
    console.log(e.detail)
    this.setData({
      value2: e.detail
    })
    this.onShow()
  },
})