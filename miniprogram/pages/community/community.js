// miniprogram/pages/discuss/discuss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  changeTab(e){
    if(e.detail.index === 0) {
      this.getData()
    } else if (e.detail.index === 1) {
      this.getData(0)
    } else {
      this.getData(1)
    }
  },


  fechData: function () {
    const db = wx.cloud.database()
    db.collection('advise').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      this.setData({
        list: res.data
      })
    })
  },

  toAdviseDetail(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      //目的页面地址
      url: "../commentDetail/commentDetail?id=" + id + "&from=community",
      success: function(res){},
    })
  },

  getData: function(status) {
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'advise-list',
      data: {
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
    this.getData(0)
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
