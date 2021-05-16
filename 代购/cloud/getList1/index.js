// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env:"daigou-4gj8ww2cefe5c72f"
})

// 云函数入口函数
exports.main = async (event, context) => {
	return cloud.database().collection("Fcircle").get({
		success(res){
			return res;
		},
		fail(res){
			return res;
		}
	})
	
}