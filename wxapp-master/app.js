//app.js
import api from './utils/api'
import wxRequest from './es6-promise/utils/wxRequest'
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    //this.getuserID()
  },

  globalData: {
    userInfo:null,
    openid: null,
    debug: false
  },
  /*获取用户ID*/
  getuserID: function (cb) {
    console.log("获取用户ID");
    var that = this
    if (this.globalData.openid) {
      console.log("获取用户ID  openid is null");
      typeof cb == "function" && cb(this.globalData.openid)
    } else {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var url = api.getOpenidUrl(res.code);
        var getOpenid = wxRequest.getRequest(url);
        getOpenid.then(res => {
          if (res.data.responseCode == "OK") {
            this.globalData.openid = res.data.result.openid
            typeof cb == "function" && cb(that.globalData.openid)
            console.log("获取用户ID  openid  :" + this.globalData.openid);
          } else {
            wx.showModal({
              title: '提示',
              content: '非常抱歉，用户信息取得失败，请重新登录小程序后进行尝试',
              showCancel: false,
              success: function (res) {
                return false;
              }
            })
          }
        })
      }
    })
    }
  },
  /*获取用户信息*/
  getuserInfo: function (cb) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getUserInfo()
            }
          })
        }
      }
    })
  }
})