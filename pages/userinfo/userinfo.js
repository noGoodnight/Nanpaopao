// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      showName:false,
      showPictures:false,
      showId:false,
      userName:'柳斯宁',
      userId:'181250093',
      activeNames:['1'],
      gain:0,
      myneed:[
        {name:'需求1',detail:'细节',award:'100'},
        {name:'需求2',detail:'细节',award:'100'},
        {name:'需求3',detail:'细节',award:'100'},
      ],
      pictures:[
        {
          url:"http://img2.imgtn.bdimg.com/it/u=3536962002,2703222804&fm=26&gp=0.jpg",
          name:"cat1"
        },
        {
          url:"http://img5.imgtn.bdimg.com/it/u=187649172,1956357065&fm=26&gp=0.jpg",
          name:"cat2"
        },
        {
          url:"http://img5.imgtn.bdimg.com/it/u=2069266298,515098533&fm=26&gp=0.jpg",
          name:"cat3"
        }
      ]
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