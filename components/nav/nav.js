// components/nav/nav.js.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    current:{
      type:String
    }
  },

  options: {
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    navList:[
      {name:'服务中心',pic:'/resources/imgs/img2.jpg',picSel:'/resources/imgs/img5.png',url:'/pages/index/index'},
      {name:'个人中心',pic:'/resources/imgs/img2.jpg',picSel:'/resources/imgs/img5.png',url:'/pages/main/main'}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goNav:function(e){
      let index=e.currentTarget.dataset.index;
      // this.setData({
      //   current:index
      // })
      if(this.data.current!=index){
        wx.navigateTo({
          url: this.data.navList[index].url,
        })
      }
    }
  }
})
