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
  getData: function(options) {
    const db = wx.cloud.database()
    db.collection('advise').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      this.setData({
        list: res.data
      })
    })
  },
  changeTab(e){
    // console.log(e)
  },

  toAdviseDetail(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      //目的页面地址
      url: "../adviseDetail/adviseDetail?id=" + id,
      success: function(res){},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    
    wx.getUserInfo({
        success: function (res) {
            //从数据库获取用户信息
            console.log(res)
        }
    });
    // wx.getWeRunData({
    //   success: function (res) {
    //       //从数据库获取用户信息
    //       console.log(res)
    //   }
    // });

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