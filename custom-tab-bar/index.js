// custom-tab-bar/index.js
Component({
  /**
   * 组件的初始数据
   */
  data: {
    active:0,
    list:[
      "/pages/browse/browse",
      "/pages/publish/publish",
      "/pages/orders/orders",
      "/pages/userinfo/userinfo"
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function (event) {
      wx.switchTab({url: this.data.list[event.detail]})
    },
  }
}
);
