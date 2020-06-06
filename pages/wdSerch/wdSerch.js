const area = require('../../resources/json/pcas-code.js')
var array;

Page({
  data: {

    citiesIndex: ['0', '0', '2', 1],
    selectedAddress: '',
    cancelTab: 0, //控制阴影
    yzmTab: 0, //判断验证码
    couTime: 9 //倒计时
  },
  onLoad: function (options) {
    var that = this;
    array = area.areaList;
    that.initData();
  },
  initData: function () {
    let cityArray = [
      [],
      [],
      [],
      []
    ]; //选择器数据
    for (let i = 0, len = array.length; i < len; i++) { //存入省
      cityArray[0].push({
        name: array[i].name,
        code: array[i].code
      });
    }
    for (let j = 0, len = array[0].children.length; j < len; j++) { //存入市，默认关联第一个省
      cityArray[1].push({
        name: array[0].children[j].name,
        code: array[0].children[j].code
      });
    }
    for (let k = 0, len = array[0].children[0].children.length; k < len; k++) { //存入区，默认关联第一个省的第一个市
      cityArray[2].push({
        name: array[0].children[0].children[k].name,
        code: array[0].children[0].children[k].code
      });
    }

    for (let s = 0, len = array[0].children[0].children[0].children.length; s < len; s++) { //存入街道，默认关联第一个省的第一个市的第一个区
      cityArray[3].push({
        name: array[0].children[0].children[0].children[s].name,
        code: array[0].children[0].children[0].children[s].code
      });
    }
    this.setData({
      cityArray: cityArray
    });

  },
  //列滚动事件
  bindMultiPickerColumnChange(e) {
    console.log(e.detail.column)
    let selectedIndex = e.detail.value; //滚动到哪一项

    let cityArray = this.data.cityArray;
    let list1 = []; //存放第二列数据，即市的列
    let list2 = []; //存放第三列数据，即区的列
    let list3 = []; //存放第四例数据，即街道的列

    let citiesIndex = [];
    let provinceIndex = this.data.citiesIndex[0]; //选中的省索引
    let cityIndex = this.data.citiesIndex[1]; //选中的市索引 
    let areaIndex = this.data.citiesIndex[2]; //选中的区索引

    switch (e.detail.column) { //判断滚动的哪一列并做相应的数据处理
      case 0: //滚动第一列，即省的那一列
        for (let i = 0, len = array[selectedIndex].children.length; i < len; i++) { //存入省下面的市
          list1.push({
            name: array[selectedIndex].children[i].name,
            code: array[selectedIndex].children[i].code
          });
        }
        for (let j = 0, len = array[selectedIndex].children[0].children.length; j < len; j++) { //存入市下面的区
          list2.push({
            name: array[selectedIndex].children[0].children[j].name,
            code: array[selectedIndex].children[0].children[j].code
          });
        }
        for (let k = 0, len = array[selectedIndex].children[0].children[0].children.length; k < len; k++) { //存入区下面的街道
          list3.push({
            name: array[selectedIndex].children[0].children[0].children[k].name,
            code: array[selectedIndex].children[0].children[0].children[k].code
          });
        }


        citiesIndex = [selectedIndex, 0, 0, 0]; //记录索引
        break;
      case 1: //滚动第二列，即市的那一列
        list1 = cityArray[1]; //市那一列数据不需要更新

        for (let i = 0, len = array[provinceIndex].children[selectedIndex].children.length; i < len; i++) { //存入市下面的区
          list2.push({
            name: array[provinceIndex].children[selectedIndex].children[i].name,
            code: array[provinceIndex].children[selectedIndex].children[i].code
          });
        }

        for (let j = 0, len = array[provinceIndex].children[selectedIndex].children[0].children.length; j < len; j++) { //存入区下面的街道
          list3.push({
            name: array[provinceIndex].children[selectedIndex].children[0].children[j].name,
            code: array[provinceIndex].children[selectedIndex].children[0].children[j].code
          });
        }
        citiesIndex = [provinceIndex, selectedIndex, 0, 0]; //记录索引
        break;
      case 2: //滚动第三列，即区的那一列
        list1 = cityArray[1]; //市和区的数据都需要更新
        list2 = cityArray[2];
        for (let i = 0, len = array[provinceIndex].children[cityIndex].children[selectedIndex].children.length; i < len; i++) { //存入区下面的街道

          list3.push({
            name: array[provinceIndex].children[cityIndex].children[selectedIndex].children[i].name,
            code: array[provinceIndex].children[cityIndex].children[selectedIndex].children[i].code
          });
        }

        citiesIndex = [provinceIndex, cityIndex, selectedIndex, 0]; //记录索引
        break;
      case 3: //滚动第四列，即街道那一列
        list1 = cityArray[1];
        list2 = cityArray[2];
        list3 = cityArray[3];

        citiesIndex = [provinceIndex, cityIndex, areaIndex, selectedIndex]; //记录索引
        break;
    }
    this.setData({
      [`cityArray[1]`]: list1, //重新赋值第二列数组，即联动了市
      [`cityArray[2]`]: list2, //重新赋值第三列数组，即联动了区
      [`cityArray[3]`]: list3, //重新赋值第四列数组，即联动了街道
      citiesIndex: citiesIndex, //更新索引
    });
  },

  //选择器选择事件
  bindMultiPickerChange(e) {
    console.log(e)
    let cityIndex = e.detail.value;
    //选择的地址拼接
    let selectedAddress = array[cityIndex[0]].name + array[cityIndex[0]].children[cityIndex[1]].name + array[cityIndex[0]].children[cityIndex[1]].children[cityIndex[2]].name + array[cityIndex[0]].children[cityIndex[1]].children[cityIndex[2]].children[cityIndex[3]].name;
    this.setData({
      selectedAddress: selectedAddress
    })
    //选择的区域编码
    let areaCode = array[cityIndex[0]].children[cityIndex[1]].children[cityIndex[2]].children[cityIndex[3]].code;
    console.log("省" + array[cityIndex[0]].code, '市' + array[cityIndex[0]].children[cityIndex[1]].code, '区' + array[cityIndex[0]].children[cityIndex[1]].children[cityIndex[2]].code, '街道' + array[cityIndex[0]].children[cityIndex[1]].children[cityIndex[2]].children[cityIndex[3]].code)

  },























  //获取子组件的值
  getson: function (e) {
    this.setData({
      goodName: e.detail.name
    })
  },
  toserchList: function () {
    wx.navigateTo({
      url: '/pages/wdSerch/wdSerchList/wdSerchList',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        //   acceptDataFromOpenedPage: function (data) {
        //     console.log(data)
        //   },
        //   someEvent: function (data) {
        //     console.log(data)
        //   }
      }
    })
  },
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
})