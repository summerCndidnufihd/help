const DB = wx.cloud.database().collection("all")
.orderBy('createTime', 'desc') //按发布时间排序
const db = wx.cloud.database();//初始化数据库
let Total=-1;
// 获取应用实例
const app = getApp()
let _=''

Page({
  data: {
    userInfo: {},
    lunbo:[],//轮播图
    array:[],
    location:'',
    goodList:[],
    starAddr:'',
    endAddr:'',
  },
  
   // 轮播图
   Carouse() {
    // 调用默认环境数据库的引用
    const db = wx.cloud.database()
    // tables数据库创建的集合名称
    const banner = db.collection('Carouse') 
    //promise
    banner.get().then(res => {
        this.setData({
          lunbo: res.data
        })
        console.log("轮播图",res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    //轮播图
    this.Carouse();
    var that = this;
    that.setData({
      userInfo:getApp().globalData.userInfo
    })
    //展示主页底部动态
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
    //搜索框地址搜所
    let starAddr = this.data.starAddr
    let endAddr = this.data.endAddr
    console.log(starAddr)
    console.log(endAddr)
  //   if (starAddr != ''&&endAddr != '') {
  //     console.log("不为空")
  //     that.setData({
  //       starAddr: this.data.starAddr,
  //       endAddr:this.data.endAddr
  //     })
  //   }else{
  //     console.log("为空")
  //   }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 获取用户位置，定位功能
  getCityNameOFLocation: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        console.log("定位成功");
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/?l&get_poi=1',
          data: {
            "key" : "YLFBZ-WHAWI-ZXUGH-53Q65-TOJ7E-ADBNQ",
            "location" : locationString
          },
          method: 'GET',
          // header: {}, 
          success: function(res){
            // success
            console.log("请求成功");
            console.log("请求数据:" + res.data.result.address);
            that.setData({
              location:res.data.result.address
            })
          },
          fail: function() {
            // fail
            console.log("请求失败");
          },
          complete: function() {
            // complete
            console.log("请求完成");
          }
        })
      },
      fail: function() {
        // fail
        console.log("定位失败");
      },
      complete: function() {
        // complete
        console.log("定位完成");
      }
    })
  },
  getCityNameOFLocation: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        console.log("定位成功");
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/?l&get_poi=1',
          data: {
            "key" : "YLFBZ-WHAWI-ZXUGH-53Q65-TOJ7E-ADBNQ",
            "location" : locationString
          },
          method: 'GET',
          // header: {}, 
          success: function(res){
            // success
            console.log("请求成功");
            console.log("请求数据:" + res.data.result.address);
            that.setData({
              location:res.data.result.address
            })
          },
          fail: function() {
            // fail
            console.log("请求失败");
          },
          complete: function() {
            // complete
            console.log("请求完成");
          }
        })
      },
      fail: function() {
        // fail
        console.log("定位失败");
      },
      complete: function() {
        // complete
        console.log("定位完成");
      }
    })
  },
  //发布代购任务
    setHelp: function () {
      wx.navigateTo({
        url: '../setHelp/setHelp',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    //获取购买地
    getStarAddr(event){
      var that=this
      console.log('输入的购买地：', event.detail.value)
      that.setData({
        starAddr: event.detail.value
      })
    },
    //获取目的地
    getEndAddr(event){
      var that=this
      console.log('输入的目的地：', event.detail.value)
      that.setData({
        endAddr: event.detail.value
      })
    },
//多字段模糊搜索
search() {
  // let starAddr=this.data.starAddr
  console.log("点击了搜索")
  wx.showLoading({
    title: '加载中',
    mask: true,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { wx.hideLoading();},
  })
  //重新给数组赋值为空
  this.setData({
    'goodList': []
  })
  // 数据库正则对象
  db.collection('all').where(
  //  _.or(
  //    [
      {
        starAddr: db.RegExp({
          regexp: this.data.starAddr,//做为关键字进行匹配
          options: 'i',//不区分大小写
        })
      },
    //   {
    //     endAddr: db.RegExp({
    //       regexp:this.data.endAddr,//做为关键字进行匹配
    //       options: 'i',//不区分大小写
    //     })
    //   }
    // ]
    // )
    )
  .get().then(res => {
    console.log(res.data)
    if(res.data==''){
    wx.hideLoading();
      wx.showToast({
        icon:'none',
        title: '啊噢,搜不到',
      })
    }
    for (var i = 0; i < res.data.length; i++) {
      var address = "goodList[" + i + "].address"
      var id = "goodList[" + i + "].id"
      var price = "goodList[" + i + "].price"
      var date = "goodList[" + i + "].date"
      var type = "goodList[" + i + "].type"
      var userImg = "goodList[" + i + "].userImg"
      var nickName = "goodList[" + i + "].nickName"
      var content = "goodList["+ i +"].content"
      var starAddr = "goodList[" + i + "].starAddr"
      var endAddr = "goodList["+ i +"].endAddr"
      this.setData({
        [address]: res.data[i].address,
        [id]: res.data[i]._id,
        [price]: res.data[i].price,
        [date]: res.data[i].date,
        [type]: res.data[i].type,
        [userImg]: res.data[i].userImg,
        [nickName]: res.data[i].nickName,
        [content]: res.data[i].content,
        [starAddr]: res.data[i].starAddr,
        [endAddr]: res.data[i].endAddr,
      })
      //console.log("这个啥",this.data.goodList[i].starAddr)
    }
  }).catch(err => {
    console.error(err)
    wx.hideLoading();
  })
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
})

