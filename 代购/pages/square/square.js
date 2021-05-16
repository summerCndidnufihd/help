const DB = wx.cloud.database().collection("Fcircle")
.orderBy('createTime', 'desc') //按发布视频排序
const app = getApp();
const db = wx.cloud.database();
//获取数据库集合
const dbData = db.collection('Fcircle').orderBy('createTime', 'desc')
let Total=-1;

let love = false
let praise = false
let id = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    list:[],//刷新的
    PList:[],//点赞关注列表
    navbar: ['推荐', '关注', '附近'],
    currentTab: 0,
    loveUrl:'../../images/love.png',
    praiseUrl:'../../images/praise.png'
  },

  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  onLoad(options) {
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
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    DB.skip(len).get({
      success(res) {
        that.setData({
          array: res.data
        })
      // this.getData();
        wx.hideLoading()
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i].content)
          console.log(res.data[i].upLoadImg)
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
  //图片预览
    // 预览图片
    previewImg: function(e) {
      let imgData = e.currentTarget.dataset.img;
      console.log("eeee", imgData[0])
      console.log("图片s", imgData[1])
      wx.previewImage({
        //当前显示图片
        current: imgData[0],
        //所有图片
        urls: imgData[1]
      })
    },
    //底部刷新加载
    onReachBottom:function(){
      // if (this.data.list.length > 0) {
      //   if (this.data.list.length === this.pageData.skip) {
      //     return;
      //   }
      // }
      this.getData();
    },
    //下滑刷新
    onPullDownRefresh:function(){
      this.getData(res =>{
        // 加载数据后停止下拉刷新
        wx.stopPullDownRefresh();
        this.pageData.skip = 0;
      })
      
    },
    //获取数据
    getData:function(callback){
      if(!callback){
        callback = res =>{}
      }
      wx.showLoading({
        title: '数据加载中',
      })
      // 分页获取数据
      dbData.skip(this.pageData.skip).get().then(res => {
        let oldData = this.data.array;
        console.log(res.data)
        console.log(this.data.array.length)
        console.log(this.pageData.skip)
        this.setData({
          array: oldData.concat(res.data)
        },res => {
          this.pageData.skip = this.pageData.skip + 15
          wx.hideLoading();
          callback();
        })
      })
    },
    pageData:{
      skip: 0
    },
//点赞
clickLove: function (e) {
  DB.get({
    success(res){
       PList=res.data
      var index = e.currentTarget.dataset.curindex;
      if (this.PList[index]) {
        var love = PList[index].love;
        if (love !== undefined) {
          var onum = PList[index].loveNum;
          if (love) {
            PList[index].loveNum = (onum - 1);
            PList[index].love = false;
          } else {
            PList[index].loveNum = (onum + 1);
            PList[index].love = true;
          }
          this.setData({
            PList: PList
          })
        }
      }
    }
  })
},

  //发布信息函数
  setNews: function () {
    wx.navigateTo({
      url: '../setNews/setNews',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
})