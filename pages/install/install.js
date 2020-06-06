Page({
  data: {
    cancelTab: 0, //控制阴影
    yzmTab: 0, //判断验证码
    couTime: 9, //倒计时
    dateList: [
      ['2020-5-12', '2020-5-13', '2020-5-14', '2020-5-15', '2020-5-16', '2020-5-17', '2020-5-18', '2020-5-19'],
      ['上午9：00-12：00', '下午13：00-17：00']
    ],
  },

  onLoad: function (options) {

  },
  onShow: function () {
    if (wx.getStorageSync('addUserName')) {
      this.setData({
        addUserName: wx.getStorageSync('addUserName'),
        phone: wx.getStorageSync('phone'),
        area: wx.getStorageSync('area'),
        address: wx.getStorageSync('address'),
      })
      wx.removeStorageSync('addUserName')
      wx.removeStorageSync('phone')
      wx.removeStorageSync('area')
      wx.removeStorageSync('address')
    }
  },
  //选择产品调用
  selectgoods: function () {
    var that = this;
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0,
    })
    animation1.translateY(-500).step();
    that.setData({
      animationData1: animation1.export(),
      cancelTab: 1
    })
  },
  //获取子组件的值
  getson: function (e) {
    this.setData({
      goodName: e.detail.name
    })
  },
  //跳转地址
  gotocontact: function () {
    let addInfo = 1;
    wx.navigateTo({
      url: '/pages/main/address/address?data=' + [addInfo]
    })
  },
  //获取验证码
  getyzm: function () {
    var that = this;
    if (this.data.phone) {
      let timer = setInterval(function () {
        let couTime = that.data.couTime;
        couTime--;
        that.setData({
          couTime: couTime
        })
        if (that.data.couTime == 0) {
          clearInterval(timer);
          that.setData({
            yzmTab: 0
          })
        }
      }, 1000)
      this.setData({
        yzmTab: 1
      })
    } else {
      wx.showToast({
        title: '请先选择联系人',
        icon: 'none'
      })
    }

  },
  bindMultiPickerChange: function (e) {
    this.setData({
      dateIndex: e.detail.value
    })
  }
})