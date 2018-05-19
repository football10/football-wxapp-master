import api from '../../utils/api'
import util from '../../utils/util'
import wxApi from '../../es6-promise/utils/wxApi'
import wxRequest from '../../es6-promise/utils/wxRequest'
import qiniu from '../../utils/qiniu'
import config from '../../utils/config'

var app = getApp();
Page({
    data: {
        eventCost: '',
        eventName: '',
        address:'',
        longitude:'',
        latitude:'',
        tel:'',
        comment: '',
        isCheck:true,
        deadlineDate: '报名截止日期',
        eventKbn: ['训练', '比赛', '聚餐', '其他'],
        eventKbn_index: 0,
        display:0,
        startDate: util.formatTime(new Date()),
        startTime: '上午9点',
        multiArray: [['上午', '下午'], ['', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点'], ['', '15分', '30分', '45分']],
        multiIndex: [0, 0, 0],
        startDate1: util.formatTime(new Date()),
        startTime1: '上午9点',
        multiArray1: [['上午', '下午'], ['', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点'], ['', '15分', '30分', '45分']],
        multiIndex1: [0, 0, 0],
        startDate2: util.formatTime(new Date()),
        startTime2: '上午9点',
        multiArray2: [['上午', '下午'], ['', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点'], ['', '15分', '30分', '45分']],
        multiIndex2: [0, 0, 0],
        startDate3: util.formatTime(new Date()),
        startTime3: '上午9点',
        multiArray3: [['上午', '下午'], ['', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点'], ['', '15分', '30分', '45分']],
        multiIndex3: [0, 0, 0]
    },
    changeMultiPicker(e) {
      this.setData({ multiIndex: e.detail.value })
    },
    changeMultiPicker1(e) {
      this.setData({ multiIndex1: e.detail.value })
    },
    changeMultiPicker2(e) {
      this.setData({ multiIndex2: e.detail.value })
    },
    changeMultiPicker3(e) {
      this.setData({ multiIndex3: e.detail.value })
    },
    onShow: function (option) {
      wx.setNavigationBarTitle({
        title: '创建报名'
      });
    },
    onLoad: function (option) {
    },
    //绑定截止日期
    bindDeadlineDateChange: function (e) {
      this.setData({
        deadlineDate: e.detail.value
      });
    },
    //绑定日期
    bindStartDateChange: function (e) {
      this.setData({
        startDate: e.detail.value
      });
    },
    //绑定日期
    bindStartDateChange1: function (e) {
      this.setData({
        startDate1: e.detail.value
      });
    },
    //绑定日期
    bindStartDateChange2: function (e) {
      this.setData({
        startDate2: e.detail.value
      });
    },
    //绑定日期
    bindStartDateChange3: function (e) {
      this.setData({
        startDate3: e.detail.value
      });
    },
     //绑定时间
    bindStartTimeChange: function (e) {
      this.setData({
        startTime: e.detail.value
      });
    },
    //绑定标题
    bindTitle: function (e) {
      this.setData({
        eventName: e.detail.value
      })
    },
    //绑定电话
    bindTel: function (e) {
      this.setData({
        tel: e.detail.value
      })
    },
    //绑定价格
    bindMoney: function (e) {
      this.setData({
        eventCost: e.detail.value
      })
    },
    //绑定备注
    bindComment: function (e) {
      this.setData({
        comment: e.detail.value
      })
    },
    goToBack: function() {
        console.log('------------navigateBack');
        wx.navigateBack({
            delta: 1
        });
    },

    //监听时间picker选择器
    listenerPickerSelected: function (e) {
      //改变index值，通过setData()方法重绘界面
      this.setData({
        eventKbn_index: e.detail.value
      });
    }, 

    //添加备选日期
    insertbeixuan: function (e) {
      this.setData({
        display: this.data.display + 1
      });
    }, 
    //删除备选日期
    delbeixuan: function (e) {
      this.setData({
        display: this.data.display - 1
      });
    }, 
    //提交报名
    formSubmit: function (e) {
      var isCheck = true;
      //入力项目检查
      //活动地址
      if (this.data.address === '' || this.data.address === null) {
        isCheck = false;
        wx.showModal({
          title: '提示',
          content: '请填写活动地址',
          showCancel: false,
          success: function (res) {
          }
        })
      }
      //截止时间
      if (this.data.deadlineDate === '' || this.data.deadlineDate === null
        || this.data.deadlineDate === '报名截止日期') {
        isCheck = false;
        wx.showModal({
          title: '提示',
          content: '请填写活动报名截止日期',
          showCancel: false,
          success: function (res) {
          }
        })
      }
      console.log("isCheck :  " + this.data.isCheck);
      //TODO
      if (isCheck) {
       if (app.globalData.debug){
          var data = {
            userInfo: {
              "userId": "test1234567890",
            },
            requestInfo: {
              "eventName": "足球报名04/29",
              "eventKbn": "训练",
              "deadlineDate": "20180501",
              "eventDate1": "2018/05/01 上午",
              "eventDate2": "2018/05/01 下午",
              "eventDate3": "2018/05/02 上午",
              "eventDate4": "2018/05/02 下午",
              "eventPlaceName": "address",
              "eventPlaceX": "longitude",
              "eventPlaceY": "latitude",
              "eventCost": 12345,
              "costUnit": " ",
              "phoneNo": "000-0000-0000",
              "comment": "积极参加"
            }
          };
        }else{
          var eventDate1 = this.data.startDate + ' ' + this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]] + this.data.multiArray[2][this.data.multiIndex[2]];

          var eventDate2 = '';
          var eventDate3 = '';
          var eventDate4 = '';
          var eventCost = 0;

          if (this.data.eventCost === '' || this.data.eventCost === null) {
            eventCost = 0;
          }else{
            eventCost = this.data.eventCost;
          }

          for (var index = 1; index <= this.data.display; index++) {
            if (index == 1) {
              eventDate2 = this.data.startDate1 + ' ' + this.data.multiArray1[0][this.data.multiIndex1[0]] + this.data.multiArray1[1][this.data.multiIndex1[1]] + this.data.multiArray1[2][this.data.multiIndex1[2]];
            } else if (index == 2) {
              eventDate3 = this.data.startDate2 + ' ' + this.data.multiArray2[0][this.data.multiIndex2[0]] + this.data.multiArray2[1][this.data.multiIndex2[1]] + this.data.multiArray2[2][this.data.multiIndex2[2]];
            } else if (index == 3) {
              eventDate4 = this.data.startDate3 + ' ' + this.data.multiArray3[0][this.data.multiIndex3[0]] + this.data.multiArray3[1][this.data.multiIndex3[1]] + this.data.multiArray3[2][this.data.multiIndex3[2]];
            }
          }

          var data = {
            userInfo: {
              "userId": app.globalData.openid
            },
            requestInfo: {
              "eventName": this.data.eventName,
              "eventKbn": this.data.eventKbn[this.data.eventKbn_index],
              "deadlineDate": this.data.deadlineDate,
              "eventDate1": eventDate1,
              "eventDate2": eventDate2,
              "eventDate3": eventDate3,
              "eventDate4": eventDate4,
              "eventPlaceName": this.data.address,
              "eventPlaceX": this.data.longitude,
              "eventPlaceY": this.data.latitude,
              "eventCost": eventCost,
              "costUnit": " ",
              "phoneNo": this.data.tel,
              "comment": this.data.comment
            }
          };
        }
          var self = this;
          var url = api.createFoodballEvent();
          var postPostsRequest = wxRequest.postRequest(url, data);
          postPostsRequest.then(res => {
            if (res.data.responseCode == "OK") {
              wx.showToast({
                title: '活动创建成功',
                content: res,
                icon: 'success',
                duration: 2000
              }).then(
                wx.navigateTo({
                url: 'pages/all/all?status=create',
                })
              )
            } else {
              wx.showModal({
                title: '提示',
                content: '非常抱歉，创建活动失败，请重新登录小程序后进行尝试',
                showCancel: false,
                success: function (res) {
                  return false;
                }
              })
            }
          })
      }
    },
      //选择位置
  chooseLocation: function (e) {
    console.log("选择位置选择位置选择位置选择位置")
      console.log(e)
      var that = this
      wx.chooseLocation({
        success: function (res) {
          // success
          console.log(res)
          that.setData({
            hasLocation: true,
            longitude: res.longitude,
            latitude: res.latitude,
            address: res.address
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
});