import api from '../../utils/api'
import util from '../../utils/util'
import config from '../../utils/config'
import wxApi from '../../es6-promise/utils/wxApi'
import wxRequest from '../../es6-promise/utils/wxRequest'

var data = require('../../data/data.js');
var app = getApp();
Page({
  data: {
    postsList: data.list,
    postsShowSwiperList: [],
    isLastPage: false,
    page: 1,
    categories: 0,
    showerror: false,
    showallDisplay: false,
    displayHeader: false,
    displaySwiper: false,
    floatDisplay: false,
    userinfo:[]
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
      showerror: false,
      displaySwiper: false,
      floatDisplay: false,
      isLastPage: false,
      page: 1,
      postsShowSwiperList: []
    });
    this.fetchTopFivePosts();
  },
  onReachBottom: function () { },
  onLoad: function (options) {
    this.fetchTopFivePosts();
  },
  fetchTopFivePosts: function () {
    var self = this;
    //取置顶的文章
    console.log("URL地址" + api.foodballEventList());
    wxRequest
      .postRequest(api.foodballEventList())
      .then(response => {
        console.log("response.responseCode : " + response.data.responseCode)
        if ("OK" == response.data.responseCode) {
          console.log("@@@@@@@@@@@@@@@@@@ ")
          self.setData({
            postsList: response.data.result.eventList,
            displaySwiper: true
          },
            console.log("test^^^^^^^^^^^^ " + response.data.result.eventList));
        } else {
          self.setData({
            displaySwiper: false,
            displayHeader: true
          });
        }
        
      })
      .then(response => {
        self.fetchPostsData(self.data);
      })
      .catch(function () {
        self.setData({
          showerror: true,
          floatDisplay: false
        });
      })
      .finally(function () {
        console.log(response);
      });
  },
  //获取文章列表数据
  fetchPostsData1: function (data) {
    var self = this;
    if (!data)
      data = {};
    if (!data.page)
      data.page = 1;
    if (!data.categories)
      data.categories = 0;
    if (data.page === 1) {
      self.setData({
        postsList: []
      });
    };
    wx.showLoading({
      title: '正在加载',
      mask: true
    });
    wxRequest
      .getRequest(api.getPosts(data))
      .then(response => {
        if (response.statusCode === 200) {
          if (response.data.length < 6) {
            self.setData({
              isLastPage: true
            });
          }
          self.setData({
            floatDisplay: true,
            showallDisplay: true,
            postsList: self
              .data
              .postsList
              .concat(response.data.map((item) => {
                item.date = util.cutstr(item.date, 10, 1);
                if (item.thumbnail) {
                  if (item.thumbnail.indexOf('www.qipalin.com') > 0) {
                    item.thumbnail = config.getDomain + '/wp-content/themes/begin/timthumb.php?src=' + item.thumbnail
                  } else {
                    item.thumbnail + '?imageView2/0/w/100/h/75';
                  }
                } else {
                  item.thumbnail = '../../images/logo-100x75.png';
                }
                console.log("ceshi" + item);
                return item;
              }))
          });
        } else {
          if (response.data.code == "rest_post_invalid_page_number") {
            self.setData({
              isLastPage: true
            });
            wx.showToast({
              title: '没有更多内容',
              mask: false,
              duration: 1500
            });
          } else {
            wx.showToast({
              title: response.data.message,
              duration: 1500
            })
          }
        }
      })
      .catch(function (response) {
        if (data.page == 1) {
          self.setData({
            showerror: true,
            floatDisplay: false
          });
        } else {
          wx.showModal({
            title: '加载失败',
            content: '加载数据失败,请重试.',
            showCancel: false
          });
          self.setData({
            page: data.page - 1
          });
        }
      })
      .finally(function (response) {
        wx.hideLoading();
        wx.hideNavigationBarLoading()
      });
  },
  detial: function (e) {
    wx.navigateTo({
      url: '/pages/detial/detial?id=' + e.target.dataset.id
    });
  },
  //加载分页
  loadMore: function (e) {
    var self = this;
    if (!self.data.isLastPage) {
      self.setData({
        page: self.data.page + 1
      });
      this.fetchPostsData(self.data);
    } else {
      wx.showToast({
        title: '没有更多内容',
        mask: false,
        duration: 1000
      });
    }
  },
  redictDetail: function (e) {
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
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
})