var app = getApp();
Page({
    data:{
        userInfo:{},
        nickName:'',
        avatarUrl:'',
        signature:'心若没有归属感，走到发里都是流浪。'
    },
    onLoad:function(){
        wx.setNavigationBarTitle({
        title: '我'
        });
        var that = this
        //调用应用实例的方法获取全局数据
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (openid) {
          //更新数据
          that.setData({
            openid: openid
          })
          that.getList();
        });
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl,
            })
          },
        })
        
    },    
    //切换导航按钮
    navbtn(event) {
      const index = event.currentTarget.dataset.id;
      const that = this;
      if (index == '1') {
        that.setData({
          select: 'all',
        })
      } else {
        that.setData({
          select: '',
        })
      }
      that.getList(false);
    },
});