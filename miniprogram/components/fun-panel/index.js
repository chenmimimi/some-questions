// components/fun-panel/index.js

Component({
  options: {
    // multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    header: {
      type: String,
    }
  },

  relations: {
    "../fun-accordion/index": {
      type: "parent", // 关联的目标节点应为父节点
      linked(target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
        this.parentNode = this.getRelationNodes("../fun-accordion/index")[0];
      },
      linkChanged() {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked() {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
      }
    }
  },

  /**
   * 组件的初始数据
   */

  data: {
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  ready() {
    const query = this.createSelectorQuery();
    query
      .selectAll(".content")
      .boundingClientRect((rects) => {
        this.setData({
          height: rects[0].height * 2
        });
      })
      .exec();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggerVisible() {
      const { data } = this
      const { currentPanelVisible, panelIndex } = data;
      this.parentNode.onChildToggle(panelIndex, !currentPanelVisible);
    }
  }
});
