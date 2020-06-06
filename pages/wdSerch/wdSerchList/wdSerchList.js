Page({
  data: {
    longitude: 120.13026,
    latitude: 30.25961,
    background: [1, 2, 3],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    datalist: [],
    listShow: true,
    mapShow: false,
    markers: [{
      title: '我现在在杭州的位置',
      time: '13:00-19:00',
      phone: '1111111',
      iconPath: "./../../../resources/imgs/navlog.jpg",
      id: 0,
      latitude: '',
      longitude: '',
      width: 50,
      height: 50,
      anchor: {
        x: 0.5,
        y: 3
      },
      callout: {
        borderRadius: 5,
        padding: 10,
        content: '天堂软件园云计算科技',
        display: 'ALWAYS'
      },
      name: '天堂软件园',
      address: '古翠路118路118号'
    }],
  },
  //滑动选点
  swiperChange: function (e) {
    console.log(e.detail.current)
    let index = e.detail.current
    let markers = this.data.markers
    let longitude = markers[index].longitude
    let latitude = markers[index].latitude
    this.setData({
      longitude: longitude,
      latitude: latitude
    })
  },
  again_getLocation: function () {
    let that = this;
    // 获取位置信息
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { //非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
            success: function (res) {
              console.log(res)
              if (res.cancel) {
                that.setData({
                  isshowCIty: false
                })
                wx.showToast({
                  title: '授权失败',
                  icon: 'success',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    console.log(dataAu)
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用getLocationt的API
                      that.getLocation(that);
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) { //初始化进入
          that.getLocation(that);
        } else { //授权后默认加载
          that.getLocation(that);
        }
      }
    })
  },
  //* 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.again_getLocation()
  },
  //获取当前位置与合并数据
  getLocation: function () {
    let _this = this
    wx.getLocation({
      type: 'gcj02',
      success(res) { //授权成功
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        _this.data.markers[0].latitude = latitude
        _this.data.markers[0].longitude = longitude
        let msg = [{
            title: '财贸大楼111',
            time: '8:00-12:00',
            phone: '2222222222',
            iconPath: "./../../../resources/imgs/navlog.jpg",
            id: 1,
            latitude: 30.20961,
            longitude: 120.13026,
            width: 50,
            anchor: {
              x: 0.5,
              y: 3
            },
            callout: {
              content: '财贸大楼',
              display: 'ALWAYS'
            },
            height: 50,
            name: '财贸大楼',
            address: '西湖区区长平路93号'
          },
          {
            title: '任意地方',
            time: '8:00-12:00',
            phone: '33333333333',
            iconPath: "./../../../resources/imgs/navlog.jpg",
            id: 2,
            anchor: {
              x: 0.1,
              y: 3
            },
            latitude: 30.28961,
            longitude: 120.13026,
            callout: {
              content: '神州大厦',
              display: 'ALWAYS'
            },
            width: 50,
            height: 50,
            name: '神州大厦',
            address: '凤起路66路116号'
          }
        ]
        let markers = [..._this.data.markers, ...msg]
        _this.setData({
          datalist: markers,
          markers: markers
        })
      },
    })

  },

  //导航终点
  markertap: function (e) {
    let markerId = e.detail.markerId !== undefined ? e.detail.markerId : e.currentTarget.dataset.markers.id
    let markers = this.data.markers
    let markersMsg = {}
    for (let i = 0; i < markers.length; i++) {
      if (markerId == markers[i].id) {
        markersMsg.latitude = markers[i].latitude
        markersMsg.longitude = markers[i].longitude
        markersMsg.name = markers[i].name
        markersMsg.address = markers[i].address
        break
      }
    }
    console.timeEnd('global')
    wx.openLocation(markersMsg)
  },
  bindmarkertap: function (e) {
    console.log('e.detail', e.detail)
  },
  WdShow: function (e) {
    let index = e.currentTarget.dataset.index
    index ? (this.setData({
      listShow: true,
      mapShow: false
    })) : (this.setData({
      listShow: false,
      mapShow: true
    }))
  },

  //打电话
  phoneCall: function (e) {
    let index = e.currentTarget.dataset.markers.id
    console.log('index', index)
    let markers = this.data.markers
    console.log(markers)
    let phone = ''
    for (let i = 0; i < markers.length; i++) {
      if (index == markers[i].id) {
        phone = markers[i].phone
      }
    }
    console.log('phone', phone)
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function () {
        console.log('拨打成功')
      },
      fail: function () {
        console.log('拨打失败')
      }
    })
  },

})