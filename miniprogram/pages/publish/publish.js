// pages/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minDate: new Date().getTime(),
    maxDate: new Date(new Date().getTime()+91*24*3600*1000).getTime(),
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } 
      else if (type === 'month') {
        return `${value}月`;
      } 
      else if (type === 'day') {
        return `${value}日`;
      } 
      else if (type === 'hour') {
        return `${value}点`;
      } 
      else if (type === 'minute') {
        return `${value}分`;    
      }
      return value;
    },
    title:"",
    showDialog:false,
    showTimePicker:false,
    start:"",
    end:"",
    amount:Number,
    ddl:"",
    description:"",
    contact:"",
    type:"",
    isFinished:false,
    DDLinMillisecond:""
  },
  inputTitle(event){
    this.setData({
      title:event.detail.value
    });
    console.log("Title: "+this.data.title)
  },
  inputDscpt(event){
    this.setData({
      description:event.detail.value
    });
    console.log("Description: "+this.data.description)
  },
  inputAmount(event){
    this.setData({
      amount:parseInt(event.detail.value)
    });
    console.log("Amount: "+this.data.amount)
  },
  inputContact(event){
    this.setData({
      contact:event.detail.value
    });
    console.log("Contact: "+this.data.contact)
  },
  placeChange(event) {
    this.setData({

    });
  },
  startClick(event) {
    const { name } = event.currentTarget.dataset;
    console.log("start click "+name)
    this.setData({
        start:name
    });
  },
  endClick(event){
    const { name } = event.currentTarget.dataset;
    console.log("end click "+name)
    this.setData({
        end:name
    });
  },
  typeClick(event){
    const { name } = event.currentTarget.dataset;
    this.setData({
        type:name
    });
    console.log("type is "+this.data.type)
  },
  showPopup() {
    this.setData({ showTimePicker: true });
  },
  closePopup() {
    this.setData({ showTimePicker: false });
  },
  inputDDL(e) {
    this.setData({
      DDLinMillisecond:e.detail
    });
    var date = new Date(e.detail);
    var year = date.getFullYear();
    var month = date.getUTCMonth()+1;
    var day = date.getUTCDate();
    console.log(year+" "+month+" "+day)
    if (month<10){
      month = "0"+month;
    }
    if (day<10){
      day = "0"+day;
    }
    var hour = date.getHours();
    if (hour<10){
      hour = "0"+hour;
    }
    var min = date.getMinutes();
    if (min<10){
      min = "0"+min;
    }
    this.data.ddl = year+"-"+month+"-"+day+" "+hour+":"+min
    console.log(this.data.ddl)
    this.closePopup();
  },
  showConfirm(){
    this.setData({showDialog:true});
  },
  closeDialog(){
    this.setData({showDialog:false});
  },
  addOrder(){
    //console.log("添加order");
    if(app.globalData.isAuthenticated){
      if(this.data.title == ""){
        wx.showToast({
          title: '请输入有效的任务名称',
          mask:true,
          icon:"none"
        });
        return
      }
      else if(this.data.amount == ""||'number'!= typeof this.data.amount||isNaN(this.data.amount)){
        console.log(typeof this.data.amount)
        wx.showToast({
          title: '请输入有效的任务金额',
          mask:true,
          icon:"none"
        });
        return
      }
      else if(this.data.contact == ""){
        wx.showToast({
          title: '请输入有效的联系方式',
          mask:true,
          icon:"none"
        });
        return
      }
      else if(this.data.start == ""){
        wx.showToast({
          title: '请选择有效的任务起点',
          mask:true,
          icon:"none"
        });
        return
      }
      else if(this.data.end == ""){
        wx.showToast({
          title: '请选择有效的任务终点',
          mask:true,
          icon:"none"
        });
        return
      }
      else if(this.data.type == ""){
        wx.showToast({
          title: '请选择有效的任务类型',
          mask:true,
          icon:"none"
        });
        return
      }
      else if(this.data.ddl == ""){
        wx.showToast({
          title: '请输入有效的任务DDL',
          mask:true,
          icon:"none"
        });
        return
      }
      else{
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'addOrder',
          // 传递给云函数的event参数
          data: {
            title:this.data.title,
            amount:this.data.amount,
            ddl:this.data.ddl,
            description:this.data.description,
            start:this.data.start,
            end:this.data.end,
            type:this.data.type,
            contact:this.data.contact,
            publishTime:new Date().getTime(),
            DDLinMillisecond:this.data.DDLinMillisecond
          }
        }).then(res => {
          wx.showToast({
            title: '发布成功',
            mask:true,
            success:function(){
              setTimeout(
                function(){
                  wx.switchTab({
                    url: "/pages/orders/orders",
                  })
                },
                500
              )
            }
          });
        }).catch(err => {
          wx.showToast({
            title: '添加失败，请检查网络或稍后重试',
            mask:true,
            icon: "none",
            duration: 500,
          });
          console.log(err)
        })
      }
  }
  else{
    this.closeDialog()
    wx.showToast({
      title: '请先完成身份验证',
      mask:true,
      icon:"none",
      duration:500,
    })
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/userinfoSubpage/userInfoFile/userInfoFile',
      })
    }
      , 500)
  }
}
  ,



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
            active: 1
        });
    }
  },


})