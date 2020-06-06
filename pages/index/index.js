// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTip: '洗衣机清洗方式'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
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
  navs($event) {
    // if (!this.data.Mains.userHeadImg){
    //   wx.showToast({
    //     title: '请先登录',
    //     icon:'none'
    //   })
    // }else{
    let $path = $event.currentTarget.dataset.url
    console.log($path)
    wx.navigateTo({
      url: $path
    })
    // }
  },
  maintain: function () {
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + encodeURIComponent('https://wechat1.papwmhz.cn/small/wechatmall/goodsDetail.php?gdid=10228'),
    })
  }
})