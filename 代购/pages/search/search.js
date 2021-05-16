// pages/search/search.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: "",
    //搜索过后商品列表
    goodList:[]
  },
  input(e) {
    this.setData({
      searchVal: e.detail.value
    })
    console.log(e.detail.value)
  },
  clear: function () {
    this.setData({
      searchVal: ""
    })
  },
  //关键字模糊搜索
  search: function () {
    wx: wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    //重新给数组赋值为空
    this.setData({
      'goodList': []
    })
    // 数据库正则对象
    db.collection('all').where({
      content: db.RegExp({
        regexp: this.data.searchVal,//做为关键字进行匹配
        options: 'i',//不区分大小写
      })
    })
    .get().then(res => {
      console.log(res.data)
      for (var i = 0; i < res.data.length; i++) {
        var address = "goodList[" + i + "].address"
        var id = "goodList[" + i + "].id"
        var price = "goodList[" + i + "].price"
        var date = "goodList[" + i + "].date"
        var type = "goodList[" + i + "].type"
        var userImg = "goodList[" + i + "].userImg"
        var nickName = "goodList[" + i + "].nickName"
        var content = "goodList["+ i +"].content"
        this.setData({
          [address]: res.data[i].address,
          [id]: res.data[i]._id,
          [price]: res.data[i].price,
					[date]: res.data[i].date,
					[type]: res.data[i].type,
          [userImg]: res.data[i].userImg,
					[nickName]: res.data[i].nickName,
					[content]: res.data[i].content,
        })
        console.log(this.data.goodList[i].content)
        wx.hideLoading();
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var that = this
		let searchVal = this.data.searchVal
    console.log(searchVal)//输出其他页面传来的值
    if (searchVal != '') {
      console.log("不为空")
      that.setData({
        searchVal: this.data.searchVal
      })
      this.search();
    }else{
      console.log("为空")
      that.search();
    }
  },
  
})
