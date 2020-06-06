// pages/main/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [{
        username: '酸菜鱼',
        phone: "12312351235",
        area: "浙江省杭州市西湖区古荡街道",
        address: "天堂软件园",
        isdefault: '1'
      },
      {
        username: '酸菜鱼',
        phone: "12312351235",
        area: "浙江省杭州市西湖区古荡街道",
        address: "天堂软件园",
        isdefault: '0'
      },
      {
        username: '酸菜鱼',
        phone: "12312351235",
        area: "浙江省杭州市西湖区古荡街道",
        address: "天堂软件园",
        isdefault: '0'
      },
      {
        username: '酸菜鱼',
        phone: "12312351235",
        area: "浙江省杭州市西湖区古荡街道",
        address: "天堂软件园",
        isdefault: '0'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.data) {
      let data = options.data.split(',');
      this.setData({
        addInfo: data[0]
      })
    }

  },
  goback: function (e) {
    if (this.data.addInfo) {
      let index = e.currentTarget.dataset.index;
      let addUserName = this.data.addressList[index].username;
      let phone = this.data.addressList[index].phone;
      let area = this.data.addressList[index].area;
      let address = this.data.addressList[index].address;
      wx.setStorageSync('addUserName', addUserName)
      wx.setStorageSync('phone', phone)
      wx.setStorageSync('area', area)
      wx.setStorageSync('address', address)
      if (this.data.addInfo) {
        wx.navigateBack({
          delta: 1
        })
      }
    }

  },
  //新增地址
  add: function () {
    wx.navigateTo({
      url: '/pages/main/address/newaddress',
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