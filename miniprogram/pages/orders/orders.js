// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    show2: false,
    show3: false,
    active: 0,
    fb:[],
    rw:[],
    myOpenId:"",
    tmpId:"",
    tmpContact:"",
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var picList = []
    picList.push("https://wxforweb-1302222241.cos.ap-nanjing.myqcloud.com/%E5%8D%97%E5%A4%A7%E6%A0%A1%E5%9B%AD.jpg")
    picList.push("https://wxforweb-1302222241.cos.ap-nanjing.myqcloud.com/%E5%8D%97%E5%A4%A7%E9%9B%AA%E6%99%AF.jpg")
    picList.push("https://wxforweb-1302222241.cos.ap-nanjing.myqcloud.com/%E9%A6%99%E9%9B%AA%E6%B5%B7.jpg")
    picList.push("https://wxforweb-1302222241.cos.ap-nanjing.myqcloud.com/QQ%E5%9B%BE%E7%89%8720200523104552.jpg")
    that.setData({
      picList: picList,
    })
    
    wx.stopPullDownRefresh()
    const app = getApp()
    const myopenid = app.globalData.openId
    this.setData({
      myOpenId: myopenid
    })

    let _this=this
    const db = wx.cloud.database()
    db.collection('orders').get({
      success: function (res) {
        var list1 = []
        var list2 = []
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].pusherId == myopenid) {
            list1.push(res.data[i])
          }
          if (res.data[i].pullerId == myopenid && res.data[i].isFinished == false) {
            list2.push(res.data[i])
          }
        }
        list1.sort(function (a, b) {
          return b.publishTime - a.publishTime
        })
        list2.sort(function (a, b) {
          return a.DDLinMillisecond - b.DDLinMillisecond
        })
        _this.setData({
          fb: list1,
          rw: list2,
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
    this.onLoad()
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
    this.onLoad()
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

  showPopup:function(e){
    let query = e.currentTarget.dataset['id'];
    this.setData({ 
      show: true ,
      tmpId:query
      });
  },
  
  showPopup2: function (e) {
    let query = e.currentTarget.dataset['id'];
    this.setData({
      show2: true,
      tmpId: query
    });
  },

  showPopup3: function (e) {
    let query = e.currentTarget.dataset['contact'];
    this.setData({
      show3: true,
      tmpContact: query
    });
  },

  onClose() {
    this.setData({ show: false});
  },
  onClose2() {
    this.setData({ show2: false });
  },
  onClose3() {
    this.setData({ show3: false });
  },

  submit:function(e){
    this.setData({
      show:false
    })
    wx.showToast({
      title: '已确认完成！',
    })
    let _this = this
    const db = wx.cloud.database()
    console.log(this.data.tmpId)
    wx.cloud.callFunction({
      name: 'setOrderIsFinished', data: { _id: this.data.tmpId }, 
      success: (res) => {
        console.log(res)
        db.collection('orders').get({
          success: function (res) {
            var list1 = []
            var list2 = []
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].pusherId == _this.data.myOpenId) {
                list1.push(res.data[i])
              }
              if (res.data[i].pullerId == _this.data.myOpenId && res.data[i].isFinished == false) {
                list2.push(res.data[i])
              }
            }
            _this.setData({
              fb: list1,
              rw: list2,
            })
          }
        })
      },
      fail: console.error
    })

  },

    myDelete: function (e) {
      this.setData({
        show2:false
      })
      wx.showToast({
        title: '删除成功！',
      })
    let _this = this
    const db = wx.cloud.database()
    console.log(this.data.tmpId)
    wx.cloud.callFunction({
      name: 'deleteOrder', data: { _id: this.data.tmpId },
      success: (res) => {
        console.log(res)
        db.collection('orders').get({
          success: function (res) {
            var list1 = []
            var list2 = []
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].pusherId == _this.data.myOpenId) {
                list1.push(res.data[i])
              }
              if (res.data[i].pullerId == _this.data.myOpenId && res.data[i].isFinished == false) {
                list2.push(res.data[i])
              }
            }
            _this.setData({
              fb: list1,
              rw: list2,
            })
          }
        })
      },
      fail: console.error
    })

  },


  previewImg: function (e) {
    var currentUrl = e.currentTarget.dataset.currenturl
    var previewUrls = e.currentTarget.dataset.previewurl
    wx.previewImage({
      current: currentUrl, //必须是http图片，本地图片无效
      urls: previewUrls, //必须是http图片，本地图片无效
    })
  },
})