const url = require('./url')
let _services = {}
const reqQueue = []
Object.keys(url).forEach(p => {
    let item = url[p]
    _services[p] = function($data, $methods = item.method, $headers = {}) {
      let _request
      let loginStatus = false
      // 返回一个Promise请求
      return new Promise((res, rej) => {
        let netGetData = () => {
          let token = wx.getStorageSync('token')
          wx.request({
            url: item.url,
            data: Object.assign({}, $data, {}),
            method: $methods ? $methods : 'GET',
            header: Object.assign({}, {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'token':token
            }, $headers),
            success: function(r) {
              if(r.data.code=='401'){
                reqQueue.push(netGetData)
                wx.login({
                  success: function (res) {
                    console.log(res)
                    // 获取用户信息一并发送
                    if (res.code) {
                      // let postData = Object.assign({}, {
                      //   code: res.code
                      // })
                      wx.request({
                        url: 'https://testwx.papwmhz.cn/opsmpapi/mini/auth/code2session',
                        data:{
                          code: res.code
                        },
                        header:{
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Accept': 'application/json',
                          'token':token
                        },
                        success:function(p){
                          if(p.data.code=='0'){
                            wx.setStorageSync('token', p.data.token)
                            reqQueue.forEach((item) => {
                              item()
                            })
                          }
                        }
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
                })
              }else{
                res(r.data)
              }
              return
            },
            fail: function(r) {
              rej(r)
            }
          })
        }
        netGetData()
      })
    }
  }),

  module.exports = _services