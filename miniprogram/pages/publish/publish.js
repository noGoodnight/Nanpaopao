// pages/publish/publish.js
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
    showTimePicker:false,
    start:"",
    end:"",
    amount:Number,
    ddl:String,
    description:String,
    type:Number,
    isFinished:0
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
      currentDate: e.detail,
    });
    var date = new Date(e.detail);
    var year = date.getFullYear();
    var month = date.getMonth();
    if (month<10){
      month = "0"+month;
    }
    var day = date.getDay();
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
            active: 1
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