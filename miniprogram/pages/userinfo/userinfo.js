// pages/userinfo/userinfo.js
const app = getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      useravatarUrl:'',
      gender:'',
      gain:'',
      opID:'',
  },
  changePictures(){
      this.setData({
        showPictures:true,
      })
      
  },
  changeName(){
    this.setData({
      showName:true
    })
  },
  changeId(){
    this.setData({
      showId:true
    })
  },
  setName(event){
    this.setData({
      userName:event.detail,
    })
  },
  setId(event){
    this.setData({
      userId:event.detail,
    })
  },
  closeName(){
    this.setData({
      showName:false,
    })
  },
  closeId(){
    this.setData({
      showId:false,
    })
  },
  closePictures(){
    this.setData({
      showPictures:false,
    })
  },
  uploadPictures(){

  },
  contactUs(){
    wx.showModal({
      title:"联系我们",
      content:"计网大作业",
      cancelColor: 'cancelColor',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // this.userInfo=app.globalData.userInfo
      let _this=this
      this.setData({
        userInfo:app.globalData.userInfo,
        opID:app.globalData.openId
      })
      if (app.globalData.userInfo.gender){
        this.setData({
          gender:"男"
        }) 
      }
      else{
        this.setData({
          gender:"女"
        }) 
      }
      db.collection('orders').get({
        success: function (res) {
          var sum=0
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].isFinished == true ) {
              if(res.data[i].pullerId== _this.data.opID){
                  sum=sum+res.data[i].amount                   
              }
        
            }                   
          }
          //console.log(sum)
          _this.setData({
            gain:sum,
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
    this.onLoad()
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