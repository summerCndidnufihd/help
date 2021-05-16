const db = wx.cloud.database();

Page({
  data:{
		items: [
      {name: 'delivery', value: '快递'},
      {name: 'food', value: '外卖'},
      {name: 'special', value: '特产'},
      {name: 'life', value: '生活'},
    ],
    userInfo:{},
    content:"",
    starAddr:'',
    endAddr:'',
    date:'',
		price:'',
		type:'',
  },

  onLoad(){
    var that = this;
    that.setData({
      userInfo:getApp().globalData.userInfo
    })
  },
  //函数四：获取输入的内容
  getText(event) {
    var that=this
   console.log("输入的内容:", event.detail.value)
   that.setData({
     content: event.detail.value
   })
 },
 //函数四：获取输入的初始地址
  getStarAddr(event) {
    var that=this
   console.log("输入的内容:", event.detail.value)
   that.setData({
     starAddr: event.detail.value
   })
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
//函数四：获取输入的类型
radioChange: function(event) {
	var that=this
	console.log('单选框携带value值为：', event.detail.value)
	that.setData({
		type: event.detail.value
	})
},
//函数四：获取输入的价格
getPrice: function(event) {
	var that=this
	console.log('输入的价格：', event.detail.value)
	that.setData({
		price: event.detail.value
	})
},
  //函数三：发布信息
  Send(){
		let that=this;
		let type = this.data.type;
    //先将所有任务装在一个集合，展示在主页
    db.collection('all').add({
      data:{
        userImg:this.data.userInfo.avatarUrl,
        nickName:this.data.userInfo.nickName,
				content:this.data.content,
        address:this.data.address,
        date:this.data.date,
				type:this.data.type,
				price:this.data.price,
        createTime: db.serverDate(),
        starAddr:this.data.starAddr,
        endAddr:this.data.endAddr,
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
				content:this.data.content,
        date:this.data.date,
				type:this.data.type,
				price:this.data.price,
        createTime: db.serverDate(),
        starAddr:this.data.starAddr,
        endAddr:this.data.endAddr,
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
				content:this.data.content,
        date:this.data.date,
				type:this.data.items.value,
				price:this.data.price,
        createTime: db.serverDate(),
        starAddr:this.data.starAddr,
        endAddr:this.data.endAddr,
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
				content:this.data.content,
        date:this.data.date,
				type:this.data.items.value,
				price:this.data.price,
        createTime: db.serverDate(),
        starAddr:this.data.starAddr,
        endAddr:this.data.endAddr,
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
				content:this.data.content,
        date:this.data.date,
				type:this.data.items.value,
				price:this.data.price,
        createTime: db.serverDate(),
        starAddr:this.data.starAddr,
        endAddr:this.data.endAddr,
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