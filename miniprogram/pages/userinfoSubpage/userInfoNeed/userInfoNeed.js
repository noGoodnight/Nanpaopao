// pages/userInfoFile/index.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {

      pushmissions: [],
      pullmissions: [],
      opID:'',
      orderId:'',
      mission:null,
      active:0,
      show:false,
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
      pushmissions: [], //防止出现重复
      pullmissions:[]
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
                console.log(_this.data.opId)
                for (var i = 0; i < res.data.length; i++) {
                  var addToPush = false
                  var addToPull = false
                  if (res.data[i].isFinished == true ) {
                    if(res.data[i].pullerId== _this.data.opID){
                        addToPull=true
                    }
                    if(res.data[i].pusherId== _this.data.opID){
                      addToPush=true
                  }
                    if (addToPush) {
                      _this.data.pushmissions.push(res.data[i])
                    }
                    if (addToPull) {
                      _this.data.pullmissions.push(res.data[i])
                    }
                  }
                }               
                let tmppushMissions = _this.data.pushmissions
                let tmppullMissions = _this.data.pullmissions
                _this.setData({
                  pushmissions: tmppushMissions,
                  pullmissions: tmppullMissions,
                })
              }
            })
          },
          fail: console.error
        })
      }
    })
  },
  setpushMission(e){
    let temp=null
    for (var i = 0; i < this.data.pushmissions.length; i++) {
      if (this.data.pushmissions[i]._id == e.currentTarget.dataset.oid) {
        temp = this.data.pushmissions[i]
        break
      }
    }
    this.setData({
      mission:temp,
      show:true,
    })
  },
  setpullMission(e){
    let temp=null
    for (var i = 0; i < this.data.pullmissions.length; i++) {
      if (this.data.pullmissions[i]._id == e.currentTarget.dataset.oid) {
        temp = this.data.pullmissions[i]
        break
      }
    }
    this.setData({
      mission:temp,
      show:true,
    })
  },
  onClose(){
    this.setData({
      show:false,
    })
  },
  onChange(event) {
    console.log(event);
    wx.showToast({
      title: ` ${event.detail.title}`,
      icon: 'none',
    });
    this.setData({ active: event.detail });
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
