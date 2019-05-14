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
    const db = wx.cloud.database()
    db.collection('advise').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        title: this.data.inputValue,
        description: this.data.textareaValue,
        status: 0,
        createdAt: new Date(),
      },
      success(res) {
        wx.showToast({
          title: '提交建议成功',
          icon: 'success',
          duration: 2000,
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../home/home'
          })
        }, 1900)

        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      }
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
