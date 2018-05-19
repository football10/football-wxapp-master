import api from '../../utils/api'
import util from '../../utils/util'
import auth from '../../utils/auth'
import wxParse from '../../wxParse/wxParse'
import wxApi from '../../es6-promise/utils/wxApi'
import wxRequest from '../../es6-promise/utils/wxRequest'

var data = require('../../data/data.js');
var app = getApp();

Page({
  data: {
    title: '文章内容',
    detail: data.detial,
    displayDetil1:false,
    displayDetil2: false,
    displayDetil3: false,
    displayDetil4: false,
  },
   onLoad: function (options) {
     console.log("到这了吗，报名详细页面")
     this.fetchRegDetailData(options.id);
  },

   //获取报名详细内容
   fetchRegDetailData: function (id) {

   },

   //控制报名详细显示
   displayControl: function(e) {
     var id = e.currentTarget.id;
     if (id == 1){
       if (this.data.displayDetil1) {
         this.setData({
           displayDetil1: false
         })
       } else {
         this.setData({
           displayDetil1: true,
           displayDetil2: false,
           displayDetil3: false,
           displayDetil4: false
         })
       }
     } else if (id == 2) {
       if (this.data.displayDetil2) {
         this.setData({
           displayDetil2: false
         })
       } else {
         this.setData({
           displayDetil2: true,
           displayDetil1: false,
           displayDetil3: false,
           displayDetil4: false
         })
       }
     } else if (id == 3) {
       if (this.data.displayDetil3) {
         this.setData({
           displayDetil3: false
         })
       } else {
         this.setData({
           displayDetil3: true,
           displayDetil1: false,
           displayDetil2: false,
           displayDetil4: false
         })
       }
     } else if (id == 4) {
       if (this.data.displayDetil4) {
         this.setData({
           displayDetil4: false
         })
       } else {
         this.setData({
           displayDetil4: true,
           displayDetil1: false,
           displayDetil2: false,
           displayDetil3: false
         })
       }
     }
   }
})

