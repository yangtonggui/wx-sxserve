let services = require('../services/index.js')
/**
 * 检测是否登录状态
 */
module.exports = function ($app) {
  wx.login({
    success: function (res) {
      console.log(res)
      // 获取用户信息一并发送
      if (res.code) {
        let postData = Object.assign({}, {
          code: res.code
        })
        services.user_login(postData).then(p => {
          if(p.code=='0'){
            wx.setStorageSync('token', p.token)
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          // console.log(p)
        }).catch(err => {

        })
       
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    },
    fail: function (res) {
      wx.showModal({
        title: 'login 异常',
        content: (JSON.stringify(res)),
        success: function (res) { }
      })
    }
  });
}