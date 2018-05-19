import api from '../../utils/api'
import util from '../../utils/util'
import auth from '../../utils/auth'
import wxParse from '../../wxParse/wxParse'
import wxApi from '../../es6-promise/utils/wxApi'
import wxRequest from '../../es6-promise/utils/wxRequest'

var data123 = require('../../data/data.js');
var app = getApp();

Page({
    data: {
        title: '文章内容',
        detail1: data123.detial,
        commentsList: [],
        detail: [],
        ChildrenCommentsList: [],
        commentCount: '',
        detailDate: '',
        commentValue: '',
        wxParseData: [],
        display: false,
        page: 1,
        isLastPage: false,
        parentID: "0",
        focus: false,
        placeholder: "输入评论",
        postID: null,
        scrollHeight: 0,
        postList: [],
        link: '',
        dialog: {
            title: '',
            content: '',
            hidden: true
        },
        content: '',
        isShow: false, //控制menubox是否显示
        isLoad: true, //解决menubox执行一次
        menuBackgroup: false,
        likeList: [],
        likeCount: 0,
        displayLike: false,
        previous_post_id: 0,
        next_post_id: 0,
        readLogs: [],
        isSignUp: false,
        isProposerUser: false,
        signupCount:0,
        eventUserList: [],
        eventDate2Flg:false,
        eventDate3Flg: false,
        eventDate4Flg: false,
    },
    onLoad: function (options) {
        this.fetchDetailData(options.id);
        console.log("******user_login******* : " + this.user_login);
        var self = this;
        //获取屏幕的高度
        var wxGetSystemInfo = wxApi.wxGetSystemInfo();
        wxGetSystemInfo().then(response => {
            self.setData({scrollHeight: response.windowHeight})
        }),

        app.getuserID()
    },
    //获取用户信息和openid
    getUsreInfo: function () {

      
        var self = this;
        var wxLogin = wxApi.wxLogin();
        console.log("到这里了吗？？？？");
        var jscode = '';
        wxLogin().then(response => {
            jscode = response.code
            var wxGetUserInfo = wxApi.wxGetUserInfo()
            console.log("到这里了吗？？GetUserInfo = wxApi.wxGetUserInfo()？？");
            
            return wxGetUserInfo()
        }).
        //获取用户信息

        then(response => {
          console.log("到获取用户信息？");
            app.globalData.userInfo = response.userInfo;
            app.globalData.isGetUserInfo = true;
            var url = api.getOpenidUrl();
            var data = {
                js_code: jscode,
                encryptedData: response.encryptedData,
                iv: response.iv,
                avatarUrl: response.userInfo.avatarUrl
            }
            var postOpenidRequest = wxRequest.postRequest(url, data);
            postOpenidRequest.then(response => {
                if (response.data.status == '201') {
                    app.globalData.openid = response.data.openid;
                    app.globalData.isGetOpenid = true;
                } else {
                    console.log(response.data);
                }
            })
        })
    },
    showLikeImg: function () {
        var self = this;
        var flag = false;
        var _likes = self.data.detail.avatarurls;
        var likes = [];
        for (var i = 0; i < _likes.length; i++) {
            var avatarurl = "../../images/gravatar.png";
            if (_likes[i].avatarurl.indexOf('wx.qlogo.cn') != -1) {
                var _like = {
                    "avatarurl": _likes[i].avatarurl,
                    "openid": ""
                }
                likes.push(_like);
            }
        }
        self.setData({likeList: likes});
    },
    onShareAppMessage: function () {
        this.ShowHideMenu();
        return {
            title: config.getWebsiteName,
            path: 'pages/detail/detail?id=' + this.data.detail.id,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }

        }
    },
    copyLink: function () {
        this.ShowHideMenu();
        wx.setClipboardData({
            data: this.data.link,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        wx.showToast({title: '链接已复制', image: '../../images/link.png', duration: 2000})
                    }
                })
            }
        })
    },
    //获取报名详细内容
    fetchDetailData: function (id) {
        var self = this;
        var data = {
          userInfo: {
            "userId": app.globalData.openid
          },
          requestInfo: {
            "eventId": id
          }
          }
        var getPostDetailRequest = wxRequest.postRequest(api.foodballEventDetail(),data);
        getPostDetailRequest.then(response => {
          //正常时没有返回responseCode OK
          if ("OK" == response.data.responseCode) {
                self.setData({
                 detail: response.data.result.eventDetailInfo,
                 eventUserList: response.data.result.proposerUserList
                });

                if (app.globalData.debug) {

                  self.setData({
                    detail: this.data.detail1.eventDetailInfo,
                    eventUserList: this.data.detail1.proposerUserList
                  });
                }
                console.log("@@@@@eventUserList : " + this.data.detail.eventDate1);
                var userID = app.globalData.openid;

                console.log("@@@@@app.globalData.openID : " + app.globalData.openid)
               // var userID = 1;

                //取得备选日期
                if (this.data.detail.eventDate2 === '' ||
                  this.data.detail.eventDate2 === null){
                  self.setData({
                     eventDate2Flg : true
                  });
                }
                if (this.data.detail.eventDate3 === '' ||
                  this.data.detail.eventDate3 === null) {
                  self.setData({
                    eventDate3Flg : true
                  });
                }

                if (this.data.detail.eventDate4 === '' || 
                  this.data.detail.eventDate4 === null) {
                    self.setData({
                      eventDate4Flg : true
                    });
                }

                console.log("到这里了吗%%%%%%%%%% : " )
                //判断是否已经报名
                for (var i = 0; i < this.data.eventUserList.length; i++) {
                  console.log("$$$$$$$$$$$$$$$$ : " + this.data.eventUserList[i].userId)
                  if (this.data.eventUserList[i].userId == userID) {
                    self.setData({
                      isSignUp: true
                    });
                    return;
                  };
                }
                //判断是不是活动发起人
                if (userID == this.data.detail.proposerUser) {
                  self.setData({
                    isProposerUser: true
                  });
                }
            };
       })

    },
    //显示或隐藏功能菜单
    ShowHideMenu: function () {
        this.setData({
            isShow: !this.data.isShow,
            isLoad: false,
            menuBackgroup: !this.data.false
        })
    },
    join: function () {
      var self = this;
      self.getUsreInfo();
      app.globalData.isGetOpenid = true;
      if (app.globalData.isGetOpenid) {
        console.log("app.globalData.openid : " + app.globalData.openid);
        console.log("@@@@self.data.postID : " + self.data.detail.eventId);

        //调用应用实例的方法获取全局数据
        app.getuserInfo(function (userInfo) {
        });

        var data = {
          userInfo:{
            userId: app.globalData.openid,
            userName:'userTest',
            icon:'iconTest'
          },
          
          requestInfo:{
            eventId: self.data.detail.eventId,
            selectEventDate1:true,
            selectEventDate2: false,
            selectEventDate3: false,
            selectEventDate4: false,
            comment:''
          }
        };
        var url = api.postSignUpUrl();
        var postSignUpRequest = wxRequest.postRequest(url, data);
        postSignUpRequest
          .then(response => {
            if (response.data.responseCode == 'OK') {
              wx.showToast({
                title: '报名成功!',
                icon: 'success',
                duration: 900,
                success: function () {
                }
              })
            }
            else if (response.data.status == '501') {
              console.log(response.data.message);
              wx.showToast({
                title: '已报过名',
                icon: 'success',
                duration: 900,
                success: function () {
                }
              })
            }
            else {
              console.log("失败信息" + response.data.message);

            }
            self.setData({
              likeImag: "like-on.png"
            });
          })
      }
      else {
        self.userAuthorization();
      }

    },
    //根据经纬度在地图上显示
    openLocation: function () {
      var longitude = this.data.detail.eventPlaceY;
      var latitude = this.data.detail.eventPlaceX;
      //var longitude = 35.6895;
      //var latitude = 139.69169;
      wx.openLocation({
        longitude: Number(longitude),
        latitude: Number(latitude)
      })
    },
    //判断当前用户是否已报名
    getIssignup: function () { 
      var self = this;
        var data = {
          openid: "orY0a0dC4iGFsH40aZWTn4TwcFS4",
          postid: self.data.postID
        };
        var url = api.postIsSignupUrl();
        var postIsSignupRequest = wxRequest.postRequest(url, data);
        postIsSignupRequest
          .then(response => {
            if (response.data.status == '200') {
              self.setData({
                isSignUp: true
              });

              console.log("已报名");
            }

          })
    },
    //判断当前报名总人数
    getSignupCount: function () {
      var self = this;
      var getSignupCountRequest = wxRequest.getRequest(api.getSignUpCount(self.data.postID));
      getSignupCountRequest
        .then(response => {
          if (response.data.status == '200') {
            self.setData({
              signupCount: response.data.signupcount
            });

            console.log("报名总人数取得成功");
          }

        })
    },
    unJoin: function () {//取消报名
      var self = this;
      self.getUsreInfo();
      app.globalData.isGetOpenid = true;
      if (app.globalData.isGetOpenid) {
        console.log("app.globalData.openid : " + app.globalData.openid);
        var data = {
          openid: "orY0a0dC4iGFsH40aZWTn4TwcFS4",
          postid: self.data.postID
        };
        var url = api.postDelSignUpUrl();
        var postDelSignUpRequest = wxRequest.postRequest(url, data);
        postDelSignUpRequest
          .then(response => {
            if (response.data.status == '200') {
              wx.showToast({
                title: '报名已取消!',
                icon: 'success',
                duration: 900,
                success: function () {
                }
              })
            }
            else if (response.data.status == '501') {
              console.log(response.data.message);
              wx.showToast({
                title: '尚未报名',
                icon: 'success',
                duration: 900,
                success: function () {
                }
              })
            }
            else {
              console.log(response.data.message);

            }
            self.setData({
              likeImag: "like-on.png"
            });
          })
      }
      else {
        self.userAuthorization();
      }
    },
    //跳转到报名详细画面
    regDetial: function (e) {
      console.log("跳转报名详细页面1");
      wx.navigateTo({
        url: '/pages/regDetil/regDetil?id=' + e.target.dataset.id
      });
    }
})
