// components/swipe-action/index.js
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
    on123Tap(e) {
      console.log(123333333)
      this.triggerEvent('onTap', { e }, {});
    }
  }
})
