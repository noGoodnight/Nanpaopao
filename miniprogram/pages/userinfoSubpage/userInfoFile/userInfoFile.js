// pages/userInfoFile/index.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      privateInfo:{
        userName:'',
        studentId:'',
        pictures:[
          {
            fileID:"cloud://test-g55yu.7465-test-g55yu-1302177669/certifiedPhoto/1590676979069-638"
          }
        ]
      },
      userInfo:{},
      gender:'',
      showName:false,
      showPictures:false,
      showId:false,
      activeNames:['1'],
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
    this.privateInfo.setData({
      userName:event.detail,
    })
  },
  setId(event){
    this.userInfo.setData({
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
  getGender(){
    if (this.userInfo.gender){
      this.setData({
        gender:"男"
      }) 
    }
    else{
      this.setData({
        gender:"女"
      }) 
    }
  },
  addImg : function(){
    wx.cloud.init()
    wx.chooseImage({//选择图片
        count : 1, //规定选择图片的数量，默认9
        sizeType : ["original","compressed"], //规定图片的尺寸， 原图/压缩图
        sourceType : ['album','camera'], //从哪里选择图片， 相册/相机
          success : (chooseres)=>{ //接口调用成功的时候执行的函数
            //console.log(chooseres)
            //选择图片后可以在这里上传
            wx.cloud.uploadFile({
              cloudPath: "certifiedPhoto/" + new Date().getTime() +"-"+ Math.floor(Math.random() * 1000),//云储存的路径及文件名
              filePath : chooseres.tempFilePaths[0], //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
              success : (uploadres) => { //上传图片到云储存成功
                //console.log(uploadres)
                const fileList=this.privateInfo.pictures
                fileList.push({fileId:uploadres.fileID})
                this.privateInfo.pictures.setData({
                  fileList
                })
                
                wx.showLoading({ //显示加载提示框 不会自动关闭 只能wx.hideLoading关闭
                  title : "图片上传中", //提示框显示的提示信息
                  mask : true, //显示透明蒙层，防止触摸。为true提示的时候不可以对屏幕进行操作，不写或为false时可以操作屏幕
                  success : function () {
                      wx.hideLoading() //让提示框隐藏、消失
                  }
                });
              },
              fail : (err) => {
                console.log(err)
              }
            })
        },
        fail : (err) => {
          console.log(err)
        }
    })
  },
  contactUs(){
    wx.showModal({
      title:"联系我们",
      content:"计网大作业",
      cancelColor: 'cancelColor',
    })
  },
  changeTab(event){
    wx.switchTab({url: this.data.list[event.detail]})
},
  confirmInfo(){
    console.log(this.data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        userInfo:app.globalData.userInfo
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

  },
  
  
})
