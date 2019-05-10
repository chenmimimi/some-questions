// miniprogram/pages/adviseDetail/adviseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getData: function(id) {
    const db = wx.cloud.database()
    db.collection('advise').where({
      _id: id,
    }).get().then(res => {
      this.setData({
        detail: res.data[0]
      })
      console.log(res.data)
    })
  },

  selectItem(event) {
    this.setData({
      selectId: event.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.id)
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