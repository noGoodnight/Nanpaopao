// pages/browse/browse.js
const app = getApp();
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
    option3: [{
      text: "默认排序",
      value: 0
    },
    {
      text: "金额优先",
      value: 1
    },
    ],
    value1: 0,
    value2: 0,
    value3: 0,
    missions: [],
    opID: "",
    show: false,
    orderID: "",
    mission: null,
    firstLoad: true,
    picture: [
      "",
      "https://wxforweb-1302222241.cos.ap-nanjing.myqcloud.com/%E8%81%9A%E8%B4%A4%E4%BA%AD.jpg",
      "https://wxforweb-1302222241.cos.ap-nanjing.myqcloud.com/%E5%A4%A7%E6%B4%BB.jpg",
      "https://wxforweb-1302222241.cos.ap-nanjing.myqcloud.com/%E7%A7%8B%E5%A4%A9%E5%8C%97%E5%A4%A7%E6%A5%BC.jpg",
    ],
    time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      time: this.GetDate()
    })
    let _this = this
    let value1 = _this.data.value1
    let value2 = _this.data.value2
    let value3 = _this.data.value3
    let value = _this.data.value
    let time = _this.data.time
    let opID = app.globalData.openId
    console.log(opID)
    console.log()
    _this.setData({
      missions: [] //防止出现重复
    })

    const db = wx.cloud.database()
    db.collection('orders').get({
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          var toAdd = true
          if (res.data[i].isFinished == false && res.data[i].pullerId == "null" && res.data[i].ddl > time) {
            if (value1 != 0 && res.data[i].start != _this.data.option1[value1].text) {
              toAdd = false
            }
            if (toAdd) {
              if (value2 != 0 && res.data[i].end != _this.data.option2[value2].text) {
                toAdd = false
              }
            }
            if (toAdd) {
              if (value != "") {
                if (res.data[i].title.indexOf(value) < 0 && res.data[i].description.indexOf(value) < 0) {
                  toAdd = false
                }
                console.log(toAdd)
              }
            }
            if (toAdd) {
              _this.data.missions.push(res.data[i])
            }
          }
        }
        let tmpMissions = _this.data.missions
        if (value3 == 1) {
          tmpMissions.sort(function (a, b) {
            return b.amount - a.amount
          })
        }
        _this.setData({
          missions: tmpMissions,
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

  onChange(e) {
    this.setData({
      value: e.detail,
    })
  },

  onClick() {
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
    this.showPopup()
  },

  confirm(e) {
    if (this.data.mission.pusherId == app.globalData.openId) {
      wx.showToast({
        title: '认领失败',
        icon: "none",
      })
      this.onClose()
    } else {
      const db = wx.cloud.database()
      db.collection('orders').doc(this.data.orderID).update({
        // data 传入需要局部更新的数据
        data: {
          // 表示将 done 字段置为 true
          pullerId: app.globalData.openId
        },
        success: function (res) {
          console.log('认领成功')
          wx.showToast({
            title: '认领成功',
            mask: true,
          })
        }
      })
      this.onClose()
      wx.switchTab({
        url: "/pages/orders/orders",
      })
    }
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
    this.setData({
      value1: e.detail
    })
    this.onShow()
  },

  switchEnd(e) {
    this.setData({
      value2: e.detail
    })
    this.onShow()
  },

  switchMoney(e) {
    this.setData({
      value3: e.detail
    })
    this.onShow()
  },
  GetDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = this.toString(now.getMonth() + 1);
    var date = this.toString(now.getDate());
    var hour = this.toString(now.getHours());
    var minu = this.toString(now.getMinutes());
    var _time = year + "-" + month + "-" + date + " " + hour + ":" + minu
    return _time
  },

  toString(num) {
    if (num < 10) {
      return "0" + num
    } else {
      return "" + num
    }
  }
})