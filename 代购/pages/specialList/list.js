const DB = wx.cloud.database().collection("special")
.orderBy('createTime', 'desc') //按发布视频排序
let Total=-1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
  },

  onLoad(){ 
     var that = this;
    that.setData({
      userInfo:getApp().globalData.userInfo
    })
    DB.count().then(res=>{
      Total=res.total;
      console.log("数据总数",res)
      })
    let len=this.data.array.length;
   if(Total==len){
     wx.showToast({
       title: '到底部啦~'
     })
   }
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    DB.skip(len).get({
      success(res) {
        that.setData({
          array: res.data,
        })
        wx.hideLoading()
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i].content)
        }
      },fail(res){
        console.log("请求getList失败",res)
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  },
})