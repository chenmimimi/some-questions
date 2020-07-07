Component({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    methods: {
      bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            //插入登录的用户的相关信息到数据库
            // this.setUserInfo(e.detail.userInfo);
            //授权成功后，跳转进入小程序首页
            console.log(this.data);
            this.triggerEvent('getUserInfoSuccess');

            // if(this.data.from === 'advise') {
            //   wx.redirectTo({
            //     //目的页面地址
            //     url: '../' + this.data.from + '/' + this.data.from,
            //     success: function(res){},
            //   })
            // }
            // //用户已经授权过
            // if(this.data.tab === 'mine') {
            //   wx.switchTab({
            //     url: '/pages/mine/mine'
            //   })
            // }
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title:'警告',
                content:'您点击了拒绝授权，将无法使用小程序部分功能，请授权后继续',
                showCancel:false,
                confirmText:'返回授权',
                success:function(res){
                    if (res.confirm) {
                    }
                }
            })
        }
    },
  }
})
