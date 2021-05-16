
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Usernumb:'',
    Password:''
  },
  getUsernumb(event){
    console.log("账号",event.detail.value)
    this.setData({
      Usernumb:event.detail.value
    })
  },
  getPassword(event){
    console.log("密码",event.detail.value)
    this.setData({
      Password:event.detail.value
    })
  },
  login(){
    let Usernumb = this.data.Usernumb;
    let Password = this.data.Password;
    console.log("账号",Usernumb,"密码",Password)
    if(Usernumb.length != 4){
      wx.showToast({
        title: '账号需为4位！',
      })
    }
    if(Password.length < 6){
      wx.showToast({
        title: '密码需大于6位！',
      })
  }
  //登录
 wx.cloud.database().collection('user').where({
  Usernumb:Usernumb
}).get({
  success(res){
    console.log("获取数据成功",res)
    let user = res.data[0]
    console.log(user)
    if(Password == user.Password){
      console.log("登录成功")
      wx.showToast({
        icon:'none',
        title: '登录成功！',
      })
      wx.switchTab({
        url: '../index/index',
      })
    }else{
      console.log("登录失败")
      wx.showToast({
        title: '账号或密码有错！',
      })
    }
  },
  fail(res){
    console.log("获取数据失败",res)
  }
})
 },
})