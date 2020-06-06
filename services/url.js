let config = require('../config')
module.exports = {
  //登录
  user_login: { url: config.url + '/mini/auth/code2session', method: 'GET' },
  //授权用户信息
  decode_UserInfo: { url: config.url + '/mini/decodeUserInfo', method: 'GET' },
  //授权手机号
  decode_PhoneNumber: { url: config.url + '/mini/decodePhoneNumber', method: 'GET' },
  //toekn
  check_Token: { url: config.url + '/mini/checkToken', method: 'GET' },
}