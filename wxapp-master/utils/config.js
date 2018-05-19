var DOMAIN = 'https://www.wxapi.xyz';//配置域名,域名只修改此处
var WEBSITENAME="活动报名"; //网站名称
var QINIUTOKENURL = DOMAIN + '/wp-json/qipalin/v1/qiniutoken';
var QINIUDOMAIN = 'https://images.qipalin.com'
export default {
  getDomain: DOMAIN,
  getWebsiteName: WEBSITENAME,
  getQiuniuTokenUrl: QINIUTOKENURL,
  getQiniuDomain: QINIUDOMAIN
}