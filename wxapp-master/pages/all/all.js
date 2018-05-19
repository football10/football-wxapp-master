import api from '../../utils/api'
import util from '../../utils/util'
import config from '../../utils/config'
import wxApi from '../../es6-promise/utils/wxApi'
import wxRequest from '../../es6-promise/utils/wxRequest'

var app = getApp();
Page({
  data: {
    postsList:[],
    showallDisplay: false,
    displayHeader: false,
    displaySwiper: false,
    userinfo:[],
    openid:'',
    select: '',
  },
  onShareAppMessage: function () {
    return {
      title: '『' + config.getWebsiteName + '』',
      path: 'pages/all/all',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onPullDownRefresh: function () {
    this.setData({
      displaySwiper: false,
    });
    this.fetchTopFivePosts();
  },
  onReachBottom: function () { },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;
    if ("create" === options.status){
      this.setData({
        select: 'create',
      });
    }
    //调用应用实例的方法获取全局数据
    app.getuserID(function (openid) {
      //更新数据
      that.setData({
        openid: openid
      })
      that.getList();
    });
  },


  //取得报名一览
  fetchTopFivePosts: function (option) {

    var self = this;
    var data = {
      "userInfo":{
        "userId": this.data.openid
        }
    }

    var url = null;

    if (option){
      url = api.foodballCreateEventList();
}else{
      url = api.foodballProposerEventList();
    }
    wxRequest
      .postRequest(url, data)
      .then(response => {
        if ("OK" == response.data.responseCode) {
          self.setData({
            postsList: response.data.result.eventList,
            displaySwiper: true
          });
        } else {
          self.setData({
            displaySwiper: false,
            displayHeader: true
          });
        }
      })
  },

  //报名详细画面
  detial: function (e) {
    wx.navigateTo({
      url: '/pages/detial/detial?id=' + e.target.dataset.id
    });
  },
    //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  //切换导航按钮
  navbtn(event) {
    const index = event.currentTarget.dataset.id;
    const that = this;
    if (index == '1') {
      that.setData({
        select: 'create',
      })
    } else {
      that.setData({
        select: '',
      })
    }
    that.getList();
  },
  //获取列表
  getList() {
    const that = this;
    if (that.data.select == 'create') {
      that.fetchTopFivePosts(true);
    } else {
      that.fetchTopFivePosts(false);
    }
  },
})