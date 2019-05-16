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
    console.log('陈胖胖', e.currentTarget.dataset.id)
  },
  onDelete(e) {
    console.log('又胖了',e)
  },
  onLikeTap(e) {
    console.log(111,e);
    return false;
  },
  test(e) {
    console.log(e)
  },

  getData: function(status) {
    let that = this

    wx.cloud.callFunction({
      // 云函数名称
      name: 'advise-list',
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
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
