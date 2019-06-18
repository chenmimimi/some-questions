// miniprogram/pages/discussDetail/dicussDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    from: '',
    type: '',
  },

  showInput (event) {
    const type = event.currentTarget.dataset.type
    this.setData({
      type,
    })
  },

  bindInput(e) {
    this.setData({
      content: e.detail.value
    })
  },

  toSubmitContent: function(options){
    const that = this
    const toastText = this.data.type === 'reply' ? '回复成功' : '评论成功'
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add-question-about-content',
      data: {
        type: this.data.type,
        adviseId: this.data.adviseId,
        content: this.data.content,
        nickName: this.data.userInfo.nickName,
        avatarUrl: this.data.userInfo.avatarUrl,
      },
      success(res) {
        wx.showToast({
          title: toastText,
          icon: 'success',
          duration: 2000,
        })
        that.setData({
          type: ''
        })
        that.getDiscussDetail(that.data.adviseId);
      },
      fail: console.error
    })
  },

  getDiscussDetail: function(id) {
    wx.showLoading({
      title: '加载中',
    })
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
        wx.hideLoading()
      },
      fail: console.error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    this.getDiscussDetail(options.id);
    this.setData({
      from: options.from || ''
    })
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo,
          adviseId: options.id
        })
      }
    })
  },

  onPullDownRefresh: function(options) {
    console.log('onPullDownRefresh', '下拉刷新....');
    this.getDiscussDetail(options.id);
    wx.stopPullDownRefresh;
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
