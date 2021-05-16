let id = ''
let content=''
let starAddr=''
let price=''
let type=''
const db = wx.cloud.database();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		detail:'',
		endAddr:'',
    date:'',
		userInfo:{},
	},
 //函数四：获取输入的目的地址
 getEndAddr(event) {
  var that=this
 console.log("输入的内容:", event.detail.value)
 that.setData({
   endAddr: event.detail.value
 })
},

//函数四：获取输入的时间类型
getDate: function(event) {
	var that=this
	console.log('单选框携带value值为：', event.detail.value)
	that.setData({
		date: event.detail.value
	})
},
	onLoad: function (options) {
		var that = this;
		that.setData({
      userInfo:getApp().globalData.userInfo
		})
		id=options.id
		console.log("我页来的id",id)
		//获取的目的地址和时间
		endAddr = this.data.endAddr
		date = this.data.date
		wx.cloud.database().collection("all").doc(id).get()
		.then(res=>{
			console.log("详情",res)
			console.log(res.data)
			content = res.data.content
			starAddr = res.data.starAddr
			price = res.data.price
			type = res.data.type
			this.setData({
				detail:res.data,
			})
		})
		.catch(res=>{
			console.log("详情",res)
		})
	},
//函数三：发布信息
Send(){
	let that=this;
	//先将所有任务装在一个集合，展示在主页
	db.collection('all').add({
		data:{
			userImg:this.data.userInfo.avatarUrl,
			nickName:this.data.userInfo.nickName,
			content:content,
			date:date,
			type:type,
			price:price,
			createTime: db.serverDate(),
			starAddr:starAddr,
			endAddr:endAddr,
		}
	}).then(res=>{
		console.log('success!',res)
		wx.showToast({
					title: '发布成功！',
				})
				let pages = getCurrentPages();
				let Before = pages[pages.length-2];
				//刷新页面
				// Before.refresh();
				//关闭页面
				wx.navigateBack({
					delta: 1,
				})
	}).catch(error=>{
		console.log('fail!',error)
	})
	//分类装
	console.log("调用Send函数的type的值",type)
	if(type == 'delivery'){
		that.deAdd();
	}
	if(type == 'food'){
		that.foAdd();
	}
	if(type == 'special'){
		that.spAdd();
	}
	if(type == 'life'){
		that.liAdd();
	}
},
  //函数四：添加任务信息到云端数据库
  deAdd(){
    db.collection('delivery').add({
      data:{
				userImg:this.data.userInfo.avatarUrl,
				nickName:this.data.userInfo.nickName,
				content:content,
				date:date,
				type:type,
				price:price,
				createTime: db.serverDate(),
				starAddr:starAddr,
				endAddr:endAddr,
      }
    }).then(res=>{
      console.log('success!',res)
      wx.showToast({
            title: '发布成功！',
          })
          let pages = getCurrentPages();
          let Before = pages[pages.length-2];
          //刷新页面
          // Before.refresh();
          //关闭页面
          wx.navigateBack({
            delta: 1,
          })
    }).catch(error=>{
      console.log('fail!',error)
    })
	},
	foAdd(){
    db.collection('food').add({
      data:{
				userImg:this.data.userInfo.avatarUrl,
				nickName:this.data.userInfo.nickName,
				content:content,
				date:date,
				type:type,
				price:price,
				createTime: db.serverDate(),
				starAddr:starAddr,
				endAddr:endAddr,
      }
    }).then(res=>{
      console.log('success!',res)
      wx.showToast({
            title: '发布成功！',
          })
          let pages = getCurrentPages();
          let Before = pages[pages.length-2];
          //刷新页面
          // Before.refresh();
          //关闭页面
          wx.navigateBack({
            delta: 1,
          })
    }).catch(error=>{
      console.log('fail!',error)
    })
	},
	spAdd(){
    db.collection('special').add({
      data:{
				userImg:this.data.userInfo.avatarUrl,
				nickName:this.data.userInfo.nickName,
				content:content,
				date:date,
				type:type,
				price:price,
				createTime: db.serverDate(),
				starAddr:starAddr,
				endAddr:endAddr,
      }
    }).then(res=>{
      console.log('success!',res)
      wx.showToast({
            title: '发布成功！',
          })
          let pages = getCurrentPages();
          let Before = pages[pages.length-2];
          //刷新页面
          // Before.refresh();
          //关闭页面
          wx.navigateBack({
            delta: 1,
          })
    }).catch(error=>{
      console.log('fail!',error)
    })
	},
	liAdd(){
    db.collection('life').add({
      data:{
				userImg:this.data.userInfo.avatarUrl,
				nickName:this.data.userInfo.nickName,
				content:content,
				date:date,
				type:type,
				price:price,
				createTime: db.serverDate(),
				starAddr:starAddr,
				endAddr:endAddr,
      }
    }).then(res=>{
      console.log('success!',res)
      wx.showToast({
            title: '发布成功！',
          })
          let pages = getCurrentPages();
          let Before = pages[pages.length-2];
          //刷新页面
          // Before.refresh();
          // 关闭页面
          wx.navigateBack({
            delta: 1,
          })
    }).catch(error=>{
      console.log('fail!',error)
    })
  },
})