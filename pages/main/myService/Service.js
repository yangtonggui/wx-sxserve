// pages/main/myService/Service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    navList:[
      {title:"进行中"},{title:"已完成"}
    ],
    List:[
      {type:'安装',num:'WX-0001776803',pic:'/resources/imgs/img1.jpg',name:'洗衣机',time:'2020-04-25 10:09:09'},
      {type:'维修',num:'WX-0001776803',pic:'/resources/imgs/img1.jpg',name:'洗衣机',time:'2020-04-25 10:09:09'},
    ]
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
  gotab:function(e){
    let index=e.currentTarget.dataset.index;
    this.setData({
      currentTab:index
    })
  },
  gotoPro:function(){
    wx.navigateTo({
      url: '/pages/main/myService/servicePro',
    })
  }
})