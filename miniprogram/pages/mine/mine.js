// miniprogram/pages/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTabIndex: 0,
    pageIndex: 1,
    total: 0,
    list: [],
  },

  /**
   * 操作数据库相关
   */

  changeTab(e){
    this.setData({
      currentTabIndex: e.detail.index
    })
    this.getData(e.detail.index, 1)
  },

  toAdviseDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      //目的页面地址
      url: "../commentDetail/commentDetail?id=" + id,
      success: function(res){},
    })
  },

  onConfirmChangeStatus(e) {
    const currentTabIndex = this.data.currentTabIndex
    const id = e.currentTarget.dataset.id
    const that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'change-advise-status',
      data: {
        id,
        status: currentTabIndex === 0 ? 1 : 0,
      },
      // 传给云函数的参数
      success(res) {
        that.getData(currentTabIndex)
      },
      fail: console.error
    })
  },

  onDelete(e) {
    const currentTabIndex = this.data.currentTabIndex
    const id = e.currentTarget.dataset.id
    const that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'delete-question',
      data: {
        id,
      },
      // 传给云函数的参数
      success(res) {
        that.getData(currentTabIndex, 1)
      },
      fail: console.error
    })
  },

  getData: function(status, pageIndex, loadMore = false) {
    wx.showLoading({
      title: '加载中',
    })
    this.getDataLoading = true
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get-advise-list',
      data: {
        type: 'mine',
        status,
        pageIndex,
      },
      // 传给云函数的参数
      success(res) {
        that.setData({
          pageIndex,
          total: res.result.adviseList.total / 10 ,
          list: loadMore ? that.data.list.concat(res.result.adviseList.list) : res.result.adviseList.list,
        })
        wx.hideLoading()
        that.getDataLoading = false
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData(0, 1)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (!this.getDataLoading && this.data.pageIndex < this.data.total) {
      this.getData(this.data.currentTabIndex, this.data.pageIndex + 1, true)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
