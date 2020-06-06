const services = require('../services/index')
module.exports = function ($app) {
  let token = wx.getStorageSync('token')
  wx.request({
    url: 'https://testwx.papwmhz.cn/opsmpapi/mini/checkToken',
    data:{},
    header:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'token':token
    },
    success:function(rep){
      if(rep.data.code=='401'){
        wx.login({
          success: function (res) {
            // 获取用户信息一并发送
            if (res.code) {
              let postData = Object.assign({}, {
                code: res.code
              })
              services.user_login(postData).then(p => {
                if(p.code=='0'){
                  wx.setStorageSync('token', p.token)
                }
              })
            }
          },
        });
      }
    }
  })
}