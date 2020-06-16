// pages/userInfoFile/index.js
const app = getApp()
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    studentId: '',
    localPath: '',
    authenticated:false,
    showDialog: false,
    showPopup:false,
  },
  uploadPic() {
    this.setData({
      showPopup: true,
    })
  },
  cancelUploadPic() {
    this.setData({
      showPopup: false,
    })
  },
  previewImg: function (e) {
    var img = this.data.localPath;
    // 设置预览图片路径
    if(img){    
      wx.previewImage({
      current: img,
      urls: [img]
    })}
  },
  selectImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //res.tempFilePaths 返回图片本地文件路径列表
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          localPath: tempFilePaths[0]
        })
      }
    })
  },
  loadImg: function () {
    wx.cloud.init()
    var that = this;
    const cloudPath = "certifiedPhoto/" + app.globalData.openId;
    const filePath = that.data.localPath;
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: "图片上传失败，请检查网络或稍后重试。",
          icon: "none",
          duration: 1500,
          mask: true
        });
      }
    })
  },
  setName(event) {
    this.setData({
      userName:event.detail
    })
  },
  setId(event) {
    this.setData({
      studentId: event.detail,
    })
  },
  confirmInfo() {
    if(this.data.localPath == ''){
      wx.showToast({
        title: '请上传图片',
        mask:true,
        icon:"none"
      });
      return
    }
    if(this.data.studentId==''||this.data.studentId.length!=9){
      wx.showToast({
        title: '请输入有效的学号',
        mask:true,
        icon:"none"
      });
      return
    }
    Dialog.confirm({
      title: '提示',
      message: '身份信息一旦上传后将不能再次修改，确认要上传吗？',
    })
      .then(() => {
        // on confirm
        this.handleSubmit()
      })
      .catch(() => {
        // on cancel
        console.log("cancel")
      });
  },
  handleSubmit() {
    //上传图片到云端
    this.loadImg()
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'addUser',
      // 传递给云函数的event参数
      data: {
        userName:this.data.userName,
        studentId:this.data.studentId,
        cloudPath:"certifiedPhoto/" + app.globalData.openId
      }
    }).then(res => {
      app.globalData.isAuthenticated = true
      app.globalData.userName = this.data.userName
      app.globalData.studentId = this.data.studentId
      this.setData({
        authenticated:true
      })
      //console.log(app.globalData)
      wx.showToast({
        title: '上传成功',
        duration: 1500,
        mask: true
      })
    }).catch(err => {
      console.log("上传出错")
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      opID: app.globalData.openId,
      authenticated: app.globalData.isAuthenticated,
    })
    if(this.data.authenticated){
      this.setData({
        userName:app.globalData.userName,
        studentId:app.globalData.studentId
      })
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
    this.onLoad()
  },
})