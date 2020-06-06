// pages/login/login.js
let services = require('../../services/index.js')
const isToken = require('../../utils/isToken')
Page({

  /**
   * 页面的初始数据
   */
  data: {
//判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    isToken(this)
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许的按钮
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          let params = {
            iv: res.iv,
            encryptedData: res.encryptedData,
            rawData:res.rawData,
            signature:res.signature
          }
          services.decode_UserInfo(params).then(p => {
            if(p.code=='0'){
              wx.showToast({
                title: '登录授权成功',
                icon:'none',
                duration: 2000
              })
              // wx.navigateTo({
              //   url: '/pages/main/main',
              // })
            }
          }).catch(err => {
            console.log(err + '123')
          })
          
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
  },
  getPhoneNumber(e) {
    console.log(e)
    var params = {
      encryptedData:e.detail.encryptedData,
      iv:e.detail.iv
    }
    if(e.detail.encryptedData){
      services.decode_PhoneNumber(params).then(res => {
        if(res.code=='0'){
          wx.showToast({
            title: '手机号获取成功',
            icon:'none',
            duration: 2000
          })
        }
      })
    }else{
      //用户按了拒绝按钮
      wx.showToast({
        title: "为了您更好的体验,请允许我们获取您的手机号",
        icon: 'none',
        duration: 2000
      });
    }

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