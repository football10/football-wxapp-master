var avatars = [
	'http://img.huizecdn.com/test/avatar1.jpg',
	'http://img.huizecdn.com/test/avatar2.jpg',
	'http://img.huizecdn.com/test/avatar3.jpg'
];
var detial = {
  'signupCount': '10',
  'title': "测试足球报名活动",
  'startDate': "2018/04/01",
  'startTime': '上午9点30分',
  'address': '东京都，江户川区 大岛球场',
  'money': '20000',
  'Note' :'周末大家来踢场球！',
  'avatar': 'http://img.huizecdn.com/test/avatar1.jpg',
    'avatar2': 'http://img.huizecdn.com/test/avatar2.jpg',
    'avatar3': 'http://img.huizecdn.com/test/avatar3.jpg'
};
var tplBanner = {
	'001': 'http://img.huizecdn.com/test/001.jpg',
	'002': 'http://img.huizecdn.com/test/002.jpg',
	'003': 'http://img.huizecdn.com/test/003.jpg',
	'004': 'http://img.huizecdn.com/test/004.jpg',
	'005': 'http://img.huizecdn.com/test/005.jpg',
	'006': 'http://img.huizecdn.com/test/006.jpg',
	'007': 'http://img.huizecdn.com/test/007.jpg',
};
var tpls = [{
	theme: '爬山，运动',
	banner: tplBanner['001'],
	number: '24'
}, {
	theme: '同学聚会',
	banner: tplBanner['002'],
	number: '33'
}, {
	theme: '同学聚会',
	banner: tplBanner['003'],
	number: '3'
}, {
	theme: '同学聚会',
	banner: tplBanner['004'],
	number: '40'
}, {
	theme: '同学聚会',
	banner: tplBanner['005'],
	number: '120'
}, {
	theme: '同学聚会',
	banner: tplBanner['006'],
	number: '10'
}, {
	theme: '同学聚会',
	banner: tplBanner['007'],
	number: '2'
}];
module.exports = {
	avatars: avatars,
	tplBanner: tplBanner,
	tpls: tpls,
  detial:detial,
	list: [{
    eventId: "001",
    eventName: "测试足球报名活动",
    eventDate:"2018/05/01 上午10点00分",
    eventPlaceName: '东京都江东区XX体育场',
    status: '报名中',
		avatar: avatars[0],
    proposerUserCount: '1',
		type: '免费',
		des: '清华大学50周年同学聚会，开始报名啦！',
		images: ['http://img.huizecdn.com/test/a1.jpg', 'http://img.huizecdn.com/test/b1.jpg', 'http://img.huizecdn.com/test/b2.jpg'],

    eventKbn: "训练",
    time: '上午9点30分',
		startTime: '2016-11-01',
		endTime: '2016-12-10',
		latitude: '22.543099',
		longitude: '114.057868',
		address: '东京都，江户川区 大岛球场',
    count:"10",
		num: '20',
		like: '12'
	}, {
		id: "002",
    title: "测试足球报名活动",
    status: '已结束',
		name: '唐僧',
		avatar: 'http://img.huizecdn.com/test/avatar2.jpg',
		tel: '13714412575',
		type: '￥130.00',
		des: '南山地区练习瑜伽',
		images: ['http://img.huizecdn.com/test/a2.jpg', 'http://img.huizecdn.com/test/b3.jpg'],
		time: '2016-11-01',
		startTime: '2016-11-01',
		endTime: '2016-12-10',
		latitude: '22.54677',
		longitude: '114.05938',
		address: '东京都秋叶原',
		num: '20',
    count: "10",
		like: '12',
    category: "比赛"
	}, {
		id: "003",
    title: "已结束足球活动测试",
		name: '秦时明月',
		avatar: 'http://img.huizecdn.com/test/avatar3.jpg',
		type: '￥50.00',
		des: '鹏程第一峰-深圳海拔第一高峰',
		images: ['http://img.huizecdn.com/test/avatar3.jpg', 'http://img.huizecdn.com/test/a3.jpg', 'http://img.huizecdn.com/test/a4.jpg'],
		time: '2016-11-01',
		startTime: '2016-11-01',
		endTime: '2016-12-10',
		latitude: '22.543058',
		longitude: '114.056099',
		address: '大连高新园区礼贤街1号',
		num: '20',
		like: '12',
    count: "10",
    status: '已结束',
    category: "聚餐"
	}],
  
};