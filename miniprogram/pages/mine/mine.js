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
  getOtherData: function(data) {
    for(let i = 0; i < data.length; i +=1) {
      const db = wx.cloud.database()
      db.collection('like').where({
        adviseId: data[i]._id
      }).count().then(res => {
        data[i].like = res.total
      })
      db.collection('reply').where({
        adviseId: data[i]._id
      }).count().then(res => {
        data[i].reply = res.total
      })
      db.collection('comment').where({
        adviseId: data[i]._id
      }).count().then(res => {
        data[i].comment = res.total
      })
    }
    setTimeout(() => {
      this.setData({
        list: data,
      })
    },2000)

  },

  getData: function(openid) {
    const db = wx.cloud.database()
    db.collection('advise').where({
      _openid: openid,
      status: 0,
    }).get().then(res => {
      this.getOtherData(res.data)
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
