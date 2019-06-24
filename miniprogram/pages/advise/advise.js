// miniprogram/pages/advise/advise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    textareaValue: '',
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

  addAdvise: function () {
    if( !this.data.inputValue || !this.data.textareaValue) {
      wx.showToast({
        title: '标题和描述不能为空',
        duration: 2000,
        icon: 'none',
      })
      return
    }
    this.setData({
      submitLoading: true
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add-question',
      data: {
        title: this.data.inputValue,
        description: this.data.textareaValue,
      },
      // 传给云函数的参数
      success(res) {
        wx.showToast({
          title: '提交建议成功',
          icon: 'success',
          duration: 2000,
        })
        wx.switchTab({
          url: '/pages/mine/mine'
        })
        this.setData({
          submitLoading: false
        })
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
