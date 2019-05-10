

// components/fun-accordion/index.js
let index = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 手风琴模式
    accordion: {
      type: Boolean,
      value: false,
    },
    // 初始化选中面板的 key
    defaultActiveKey: {
      type: Array,
      value: [],
    },  
    // 默认无，accordion模式下默认第一个元素
    activeKey: {
      type: Array,
      value: null,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentActiveKey: []
  },

  relations: {
    '../fun-panel/index': {
      type: 'child', // 关联的目标节点应为子节点
      linked(target) {
        this.childs = this.getRelationNodes('../fun-panel/index');
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
        target.setData({
          panelIndex: index,
        })
        index += 1
      },
      linkChanged(target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
      },
      unlinked(target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
      }
    }
  },

  observers: {
    // 监听外部传入的activeKey
    'activeKey': function (activeKey) {
      this.initCurrentActiveKey();
      this.triggerEvent('onChange')
    },
    'currentActiveKey': function(currentActiveKey) {
      this.toggerPanelVisble(currentActiveKey)
    }
  },

  ready() {
    this.initCurrentActiveKey();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggerPanelVisble (currentActiveKey) {

      for(let item of this.childs){
        const { panelIndex } = item.data
        const currentPanelVisible = currentActiveKey.indexOf(panelIndex) > -1
        item.setData({
          currentPanelVisible
        })
      }
    },

    initCurrentActiveKey() {
      const { defaultActiveKey, activeKey, accordion } = this.data
      let currentActiveKey = activeKey || defaultActiveKey
      if(accordion) {
        currentActiveKey = currentActiveKey.length > 0 ? [currentActiveKey[0]] : [0]
      }
      this.setData({
        currentActiveKey
      })
    },

    onChildToggle( curIndex, isActive ) {
      const { accordion } = this.data
      let { currentActiveKey } = this.data
      if(isActive) {
        currentActiveKey.push(curIndex)
      } else {
        const existIndex = currentActiveKey.indexOf(curIndex)
        currentActiveKey.splice(existIndex, 1)
      }
      if(accordion) {
        currentActiveKey = isActive ? [curIndex] : []
      }
      this.setData({
        currentActiveKey
      })
      this.triggerEvent('onChange', {curIndex, isActive, currentActiveKey})
    },

  },

})
