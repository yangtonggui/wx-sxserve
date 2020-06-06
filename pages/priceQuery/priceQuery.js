// pages/install/install.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancelTab:0, //控制阴影
    yzmTab:0, //判断验证码
    couTime:9, //倒计时
    textnum:0,
    repairList:['不制冷/制冷效果差','不通电','通电不工作（不启动）','显示故障代码','声音异常/噪音大','其它'],
    repIndex:0 //故障类型
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
    if(wx.getStorageSync('addUserName')){
      this.setData({
        addUserName:wx.getStorageSync('addUserName'),
        phone:wx.getStorageSync('phone'),
        area:wx.getStorageSync('area'),
        address:wx.getStorageSync('address'),
      })
      wx.removeStorageSync('addUserName')
      wx.removeStorageSync('phone')
      wx.removeStorageSync('area')
      wx.removeStorageSync('address')
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
  //选择产品调用
  selectgoods:function(){
    var that=this;
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0,
    })
    animation1.translateY(-500).step();
    that.setData({
      animationData1: animation1.export(),
      cancelTab:1
    })
  },
  //获取子组件的值
  getson:function(e){
    this.setData({
      goodName:e.detail.name
    })
  },
  bindPickerChange:function(e){
    this.setData({
      repIndex: e.detail.value
    })
  }
})