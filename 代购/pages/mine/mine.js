const db = wx.cloud.database()
const user = db.collection('userinfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 用户信息
      userinfo:{},
      // 用户ID
      openid:""
  },

  toUserInfo:function (e) {
    this.setData({
      // 返回事件中用户信息
      userinfo: e.detail.userInfo
    })
    console.log("userinfo", this.data.userinfo);
    const userinfo = e.detail.userInfo;
    if(!userinfo){
      wx.showModal({
        cancelColor: '请先登录',
      })
    }else{
      const that = this;
      wx.cloud.callFunction({
        name:'Login'
      }).then(res=>{
        that.setData({
                openid:res.result.openid,
                // 返回用户信息
                userinfo:e.detail.userInfo
              })
        const openid = res.result.openid
        //将登录的信息传入其他页面
       
        //在数据库中查找该用户的id是否存在
        user.where({_openid:openid}).get().then(result=>{
          if(result.data.length == 0){
            user.add({
              data:{
                ...userinfo,
                createTime:db.serverDate(),
              }
            }).then(res=>{
              console.log(res)
            })
          }
        })
      })
    }
    // const that = this;
    // // 使用云函数方法
    // wx.cloud.callFunction({
    //   // 云函数名
    //   name:"Login",
    //   // 云函数成功发出请求
    //   success:res=>{
    //     console.log("云函数调用成功")
    //     console.log("获取openId",res.result.openid)
    //     that.setData({
    //       openid:res.result.openid,
    //       // 返回用户信息
    //       userinfo:e.detail.userInfo
    //     })
    //     that.data.userinfo.openid = that.data.openid
    //     console.log("openid",that.data.openid)
    //     console.log("userinfo",that.data.userinfo)
    //     // 将 userinfo 上传存储，包含openid
    //     wx.setStorageSync('userinfo', that.data.userinfo)
    //   },
    //   // 云函数失败发出请求
    //   fail:res=>{
    //     console.log("云函数调用失败",res)
    //   }
    // })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取缓存信息
    const ui = wx.getAccountInfoSync("userinfo")
    this.setData({
      userinfo:ui,
      openid:ui.openid
    })
  },

})