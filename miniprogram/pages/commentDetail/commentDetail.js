// miniprogram/pages/discussDetail/dicussDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    from: '',
  },

  bindTextarea(e) {
    this.setData({
      textareaValue: e.detail.value
    })
  },

  bindInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  getDiscussDetail: function(id) {
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get-advise-detail',
      data: {
        id
      },
      success(res) {
        console.log(res)
        that.setData({
          detail: res.result.adviseDetail,
        })
      },
      fail: console.error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDiscussDetail(options.id);
    this.setData({
      from: options.from || ''
    })
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
