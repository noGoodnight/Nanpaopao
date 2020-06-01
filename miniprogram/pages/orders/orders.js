// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    show2: false,
    active: 0,
    myNickName:"",
    fb:[],
    rw:[],
    myOpenId:"",
    tmpId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.stopPullDownRefresh()
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
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        console.log(code)
        wx.cloud.callFunction({ name: 'login', data: { code: code }, 
          success: function(res) {
            console.log(res)
          let openID = res.result.userInfo.openId
          
          _this.setData({
              myOpenId: openID
          })
            const db = wx.cloud.database()
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
    wx.cloud.init({
      env: 'test-g55yu',
      traceUser: true,
    })
    const db = wx.cloud.database()
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

  onClose() {
    this.setData({ show: false,
    show2: false });
  },

  submit:function(e){
    let _this = this
    wx.cloud.init({
      env: 'test-g55yu',
      traceUser: true,
    })
    const db = wx.cloud.database()
    console.log(this.data.tmpId)
    wx.cloud.callFunction({
      name: 'new-update-order-isFinished', data: { _id: this.data.tmpId }, 
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
              show:false
            })
          }
        })
      },
      fail: console.error
    })

  },

    myDelete: function (e) {
    let _this = this
    wx.cloud.init({
      env: 'test-g55yu',
      traceUser: true,
    })
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
              show2: false
            })
          }
        })
      },
      fail: console.error
    })

  }
})