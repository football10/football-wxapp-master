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
    detail: data.detial
  }
})

