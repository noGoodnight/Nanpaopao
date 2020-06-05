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
        pictures:[],
      },
      userInfo:{},
      gender:'',
      showName:false,
      showPictures:false,
      showId:false,
      activeNames:['1'],
      confirm:false,
      user:null,
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
    var info=this.data.privateInfo
    
    info.userName=event.detail
    this.setData({
      privateInfo:info
    })
  },
  setId(event){
    var info=this.data.privateInfo
    
    info.studentId=event.detail
    this.setData({
      privateInfo:info
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
    var _this=this
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
                var filePath =chooseres.tempFilePaths[0]
                var fileList=_this.data.privateInfo.pictures
                fileList.push(filePath)               
                var info=_this.data.privateInfo
                info.pictures=fileList
                _this.setData({
                  privateInfo:info
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
    confirmInfo(){
      this.setData({
        confirm:true,
      })
  },
  closeConfirm(){
    this.setData({
      confirm:false,
    })
  },
  handleSubmit(){
    
    if(this.data.privateInfo.userName == ""){
      wx.showToast({
        title: '请输入有效的姓名',
        mask:true,
        icon:"none"
      });
      return
    }
    else if(this.data.privateInfo.studentId==""){
      wx.showToast({
        title: '请输入有效的学号',
        mask:true,
        icon:"none"
      });
      return
    }else if(this.data.privateInfo.pictures==[]){
      wx.showToast({
        title: '请添加需要认证的图片',
        mask:true,
        icon:"none"
      });
      return
    }
    else{
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'updateUser',
        // 传递给云函数的event参数
        data: {
          userName:this.data.privateInfo.userName,
          studentId:this.data.privateInfo.studentId,
          pictures:this.data.privateInfo.pictures,
        }
      }).then(res => {
        wx.showToast({
          title: '修改成功',
          mask:true,
        });
        wx.switchTab({
          url: "/pages/userinfo/userinfo",
        })
      }).catch(err => {
        console.log("添加出错")
        console.log(err)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        userInfo:app.globalData.userInfo
      })
      
      let _this = this       
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
              db.collection('users').get({
                success: function (res) {     
                  var info={}            
                  for (var k = 0; k < res.data.length; k++) {
                      if(res.data[k].userId==openID){
                        info=res.data[k]
                        break
                      }              
                  } 
                  if(info!={}){
                    _this.setData({
                      userName:info.userName,
                      studentId:info.studentId,
                      pictures:info.pictures
                    })
                  }                                              
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
