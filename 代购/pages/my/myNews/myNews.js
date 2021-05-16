
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{},
		array:[],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
    that.setData({
      userInfo:getApp().globalData.userInfo
		})
		let userInfo = this.data.userInfo
		userInfo = getApp().globalData.userInfo
		let name = userInfo.nickName
		console.log(userInfo)
		console.log(name)
		wx.cloud.database().collection('Fcircle')  //拿到表。双引号也行
		.where({//条件查询
			nickName:name,
			love:true
		})
		.get()
		.then(res=>{//请求成功
		console.log('返回的数据',res)
		this.setData({
		array:res.data
		})
				})
				.catch(err=>{//请求失败
		console.log('请求失败',err)
				})
	},

})