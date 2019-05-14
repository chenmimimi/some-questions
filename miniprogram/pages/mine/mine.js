// miniprogram/pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    selectId: 0,
  },


  /**
   * 操作数据库相关
   */
  getData: function(openid) {
    const db = wx.cloud.database()
    db.collection('advise').where({
      _openid: openid,
    }).get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      this.setData({
        list: res.data
      })
    })
  },
  changeTab(e){
    console.log(e)
  },

  toAdviseDetail(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      //目的页面地址
      url: "../commentDetail/commentDetail?id=" + id,
      success: function(res){},
    })
  },
  onConfirm(e) {
    console.log('陈胖胖',e)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this

    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      // 传给云函数的参数
      success(res) {
        that.getData(res.result.openid)
      },
      fail: console.error
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
