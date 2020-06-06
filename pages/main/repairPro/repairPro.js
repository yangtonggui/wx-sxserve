// pages/main/repairPro/repairPro.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancelTab:0, //控制阴影
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
})