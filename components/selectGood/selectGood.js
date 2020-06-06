Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cancelTab: {
      type: String
    },
    animationData1: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeID: 1,
    tab: 1,
    animationData1: null,
    cancelTab: 0,
    typeList: [{
      type: '请选择'
    }, {
      type: ''
    }, {
      type: ''
    }, {
      type: ''
    }],
    List: [{
        name: '美的',
        aList: [{
            aname: '热水器',
            bList: [{
              bname: '电热水器'
            }, {
              bname: '燃气热水器'
            }]
          },
          {
            aname: '空调',
            bList: [{
              bname: '家用空调'
            }]
          },
        ]
      },
      {
        name: '小天鹅',
        aList: [{
            aname: '洗衣机',
            bList: [{
              bname: '干衣机'
            }, {
              bname: '洗衣机'
            }]
          },
          {
            aname: '空调',
            bList: [{
              bname: '家用空调'
            }]
          },
        ]
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // selectgoods: function () {
    //   var that = this;
    //   var animation1 = wx.createAnimation({
    //     duration: 500,
    //     timingFunction: "ease",
    //     delay: 0,
    //   })
    //   animation1.translateY(-500).step();
    //   that.setData({
    //     animationData1: animation1.export(),
    //     cancelTab: 1
    //   })
    // },
    scancode: function () {
      wx.scanCode({
        success(res) {
          console.log(res)
        }
      })

    },
    cancel: function () {
      var that = this;
      console.log(this.data.animationData1)
      var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: "ease",
        delay: 0,
      })
      animation1.translateY(500).step();
      let typeList = this.data.typeList;
      typeList[0].type = '请选择';
      that.setData({
        animationData1: animation1.export(),
        cancelTab: 0, //控制阴影
        aList: '', //第二层数组
        bList: '', //第三层数组
        typeID: 1, //控制出现第几层数组
        tab: 1, //控制出现几个类型
        typeList: typeList, //类型数组
        current1: -1, //控制第一层数组的选中
        currentTab: 0, //控制类型的选中
        current2: -1 //控制第二层数组的选中
      })
    },
    //产品类别切换
    selectType: function (e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        currentTab: index,
        typeID: index + 1
      })
    },
    selectGood1: function (e) {
      let index = e.currentTarget.dataset.index;
      let aList = this.data.List[index].aList;
      let typeList = this.data.typeList;
      typeList[0].type = this.data.List[index].name;
      typeList[1].type = '请选择';
      this.setData({
        aList: aList,
        typeID: 2,
        tab: 2,
        typeList: typeList,
        current1: index,
        currentTab: 1,
        current2: -1
      })
    },
    selectGood2: function (e) {
      let index = e.currentTarget.dataset.index;
      console.log(this.data.current1)
      let bList = this.data.List[this.data.current1].aList[index].bList;
      let typeList = this.data.typeList;
      typeList[1].type = this.data.List[this.data.current1].aList[index].aname;
      typeList[2].type = '请选择';
      this.setData({
        bList: bList,
        typeID: 3,
        tab: 3,
        typeList: typeList,
        current2: index,
        currentTab: 2
      })
    },
    selectGood3: function (e) {
      var that = this;
      let index = e.currentTarget.dataset.index;
      let name = this.data.List[this.data.current1].name + ' ' + this.data.List[this.data.current1].aList[this.data.current2].aname + ' ' + this.data.List[this.data.current1].aList[this.data.current2].bList[index].bname;
      var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: "ease",
        delay: 0,
      })
      animation1.translateY(500).step();
      let typeList = this.data.typeList;
      typeList[0].type = '请选择';
      this.triggerEvent('myevent', {
        name: name
      })
      this.setData({
        goodName: name,
        animationData1: animation1.export(),
        cancelTab: 0, //控制阴影
        aList: '', //第二层数组
        bList: '', //第三层数组
        typeID: 1, //控制出现第几层数组
        tab: 1, //控制出现几个类型
        typeList: typeList, //类型数组
        current1: -1, //控制第一层数组的选中
        currentTab: 0, //控制类型的选中
        current2: -1 //控制第二层数组的选中
      })
    },
  }
})