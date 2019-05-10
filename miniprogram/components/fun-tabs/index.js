// components/tabs/index.js
Component({
  externalClasses: ['custom-class'],
  properties: {
    items: {
      type: 'array',
      value: '',
    },
    active: {
      type: 'number',
      value: 0,
    },
    indicator: {
      type: 'boolean',
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabLineData:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const { index } = e.currentTarget.dataset
      this.setData({
        active: index
      })
      this.triggerEvent('onChange', { index }, {});
    }
  },

  lifetimes: {
    ready() {
      if(this.data.indicator){
        const query = this.createSelectorQuery()
        query.selectAll('.tab-name').boundingClientRect()
        query.exec((res) => {
          const tabLineData = res[0].map((item,index) => {
            return {
              width: item.width,
              left: item.left
            }
          })
          this.setData({
            tabLineData
          })
        })
      }
    }
  }
})
