let id = ''
let content=''
let name=''
let comments=''
let praiseNum=0
let loveNum=0
let love = false
let praise = false
Page({
	data:{
		detail:'',
		images:[],
    loveUrl:'../../images/love.png',
		praiseUrl:'../../images/praise.png',
		comments:[],
	},
	onLoad(options){
		var that = this;
		that.setData({
      userInfo:getApp().globalData.userInfo
    })
		id=options.id
		console.log("详情页的id",id)
		wx.cloud.database().collection("Fcircle").doc(id).get()
		.then(res=>{
			console.log("详情",res)
		 name=res.data.nickName
		 praiseNum=res.praiseNum
		 loveNum=res.loveNum
			love=res.data.love
			praise=res.data.praise
			this.setData({
				detail:res.data,
				images:res.data.images,
				loveUrl:love ? "../../images/love1.png": "../../images/love.png",
				praiseUrl:praise ? "../../images/praise1.png": "../../images/praise.png",
				comments:res.data.comments,
			})
		})
		.catch(res=>{
			console.log("详情",res)
		})
	},
//获取评论内容
getComments(event){
	content = event.detail.value
	console.log("评论内容",event.detail.value)
},
//发表评论
postComments(){
	let commentsItem = {}
	commentsItem.name=name
	commentsItem.content = content
	let commentsArr=this.data.comments
	commentsArr.push(commentsItem)
	console.log("添加后的评论",commentsArr)
	wx.cloud.callFunction({
		name:'love',
		data:{
			action:'comments',
			id:id,
			comments:commentsArr,
		}
	})
	.then(res=>{
		console.log("发表评论成功",res)
		wx.showToast({
			title: '评论成功',
		})
		this.setData({
			comments:commentsArr
		})
	})
	.catch(res=>{
		console.log("发表评论失败",res)
	})
},
//爱/关注
clickLove(){
  this.setData({
    loveUrl:love ? "../../images/love.png": "../../images/love1.png"
  })
	love = !love
	wx.cloud.callFunction({
		name:"love",
		data:{
			action:'love',
			id:id,
			love:love,
		}
	})
  .then(res=>{
    console.log("更新成功",res)
  })
  .catch(res=>{
    console.log("更新失败",res)
  })
},
//点赞
clickPraise(){
  this.setData({
    praiseUrl:praise ? "../../images/praise.png": "../../images/praise1.png"
  })
  praise = !praise
	wx.cloud.callFunction({
		name:"love",//云函数
		data:{
			action:'praise',
			id:id,
			praise:praise,
		}
	})
  .then(res=>{
    console.log("更新成功",res)
  })
  .catch(res=>{
    console.log("更新失败",res)
  })
},
})