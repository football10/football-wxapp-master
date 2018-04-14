//app.js
import api from './utils/api'
import wxRequest from './es6-promise/utils/wxRequest'
App({
  onLaunch: function () {
    this.login();
    var that = this
  },
  globalData: {
    userInfo: null
  },
  getToken: function () {
    var url = api.postLogin();
    var data = {
      username: 'test003',
      password: 'test003'
    }
    var postPostsRequest = wxRequest.postRequest(url, data);
    postPostsRequest.then(res => {
      wx.setStorageSync('token', res.data.token);
    })
  },
  login: function () {
    this.getToken();
    this.getUserInfo();
  },

getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
      console.log("@@@@@typeof cb =&& cb(this.globalData.userInfo) : ");
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              console.log("@@@@typeof cb =&& cb(this.globalData.userInfo) : " + that.globalData.userInfo);
            }
          })
        }
      })
    }
  }
})