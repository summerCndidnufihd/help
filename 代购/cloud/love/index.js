// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
	if(event.action == 'love'){
		return await cloud.database().collection('Fcircle').doc(event.id)
		.update({
			data:{
				love:event.love,
			}
		})
		.then(res=>{
			console.log("更新成功",res)
			return res
		})
		.catch(res=>{
			console.log("更新失败",res)
			return res
		})
	}else if(event.action == 'comments'){
		return await cloud.database().collection('Fcircle').doc(event.id)
		.update({
			data:{
				comments:event.comments,
			}
		})
		.then(res=>{
			console.log("更新成功",res)
			return res
		})
		.catch(res=>{
			console.log("更新失败",res)
			return res
		})
	}else{
		return await cloud.database().collection('Fcircle').doc(event.id)
		.update({
			data:{
				praise:event.praise,
			}
		})
		.then(res=>{
			console.log("更新成功",res)
			return res
		})
		.catch(res=>{
			console.log("更新失败",res)
			return res
		})
	}
}