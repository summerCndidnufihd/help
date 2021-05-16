let userInfo = {}
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
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
		let _openid = userInfo._openid
		console.log(userInfo)
		wx.cloud.database().collection('Fcircle')  //拿到表。双引号也行
		.where({//条件查询
			// _openid:_openid,
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

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})