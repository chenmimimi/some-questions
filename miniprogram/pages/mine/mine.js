// miniprogram/pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentTabIndex: 0,
  },

  /**
   * 操作数据库相关
   */
  changeTab(e){
    this.getData(e.detail.index)
    this.setData({
      currentTabIndex: e.detail.index
    })
  },

  toAdviseDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      //目的页面地址
      url: "../commentDetail/commentDetail?id=" + id,
      success: function(res){},
    })
  },
  onConfirm(e) {
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
        that.getData(currentTabIndex)
      },
      fail: console.error
    })
  },
  onLikeTap(e) {
    console.log(111,e);
    return false;
  },
  test(e) {
    console.log(e)
  },

  getData: function(status) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get-advise-list',
      data: {
        type: 'mine',
        status,
      },
      // 传给云函数的参数
      success(res) {
        console.log(res)
        that.setData({
          list: res.result.adviseList.data,
        })
        wx.hideLoading()
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
    this.getData(0)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
