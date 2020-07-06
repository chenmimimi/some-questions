// components/btn-login/index.js
const app = getApp();

Component({
  externalClasses: ['btn-class'],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extraData: {
      type: Object,
      value: {},
    },
    phoneNumber: {
      type: String,
      value: wx.getStorageSync('phoneNumber'),
    },
    size: {
      type: String,
      value: 'mini',
    },
    btnStyle: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    phoneNumber: wx.getStorageSync('phoneNumber'),
  },

  lifetimes: {
    attached: function() {
      const phoneNumber = wx.getStorageSync('phoneNumber');
      if (phoneNumber) {
        app.globalData.mobile = phoneNumber;
        this.setData({
          phoneNumber
        })
      }

      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: (res) => {
                this.setData({
                  userInfo: {
                    ...res.userInfo,
                    openId: wx.getStorageSync('openId'),
                    unionId: wx.getStorageSync('unionId'),
                  },
                })
              }
            })
          }
        }
      });

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 询问是否授权点击取消
    // cancelGetUserInfo: function() {
    //   this.setData({
    //     getUserInfoModal: false,
    //   })
    // },

    // 如果没有用户授权，就去授权后登录
    async bindGetUserInfo (e) {
      // 若本次访问已登录，直接返回登录成功
      if (app.globalData.isActLogin) {
        this.triggerEvent('loginSuccess', { isLogin: 1 });
        return;
      }
      // const { mobile } = wx.getStorageSync('phoneNumber');
      const {cloudID} = e.detail;
      // 获取cloudId失败，则取消后续操作
      if (!cloudID) return;
      wx.cloud.callFunction({
        name: 'login',
        data: {
          userInfo: wx.cloud.CloudID(cloudID)
        }
      }).then(async (res) => {
        const { data: userInfo } = res.result.event.userInfo;
        wx.setStorage({
          key: 'openId',
          data: userInfo.openId,
        });
        wx.setStorage({
          key: 'unionId',
          data: userInfo.unionId,
        })
        const data = {
          phoneNumber: mobile,
          userInfo,
          ...this.data.extraData,
        }
        this.triggerEvent('loginSuccess', { isLogin: true });
        app.globalData.isActLogin = true;
      }).catch( () => {
      });
    },
  }
})
