// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */data: {
     Username:'',
    Usernumb:'',
    Password:'',
    Useremail:'',
  },
  getUsername(event){
    console.log("名称",event.detail.value)
    this.setData({
      Username:event.detail.value
    })
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
  getUseremail(event){
    console.log("邮箱",event.detail.value)
    this.setData({
      Useremail:event.detail.value
    })
  },
//注册
  register(){
    console.log("点击了注册")
    let Username = this.data.Username;
    let Usernumb = this.data.Usernumb;
    let Password = this.data.Password;
    let Useremail = this.data.Useremail;
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
  wx.cloud.database().collection('user').add({
    data:{
      Username:Username,
      Usernumb:Usernumb,
      Password:Password,
      Useremail:Useremail
    },
    success(res){
      console.log("注册成功",res)
      wx.showToast({
        icon:'none',
        title: '注册成功',
      })
      //跳转页面
      wx.switchTab({
        url: '../index/index',
      })
    },
    fail(res){
      console.log("注册失败",res)
      wx.showToast({
        title: '注册失败',
      })
    }
  })
}
})