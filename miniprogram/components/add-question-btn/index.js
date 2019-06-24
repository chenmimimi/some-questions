// components/add-question-btn/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toAddQuestion() {
      wx.navigateTo({
        //目的页面地址
        url: "../advise/advise",
      })
    }
  }
})
