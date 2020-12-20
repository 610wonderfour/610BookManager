// pages/keeperInfo/keeperDetail/keeperDetail.js
const app = getApp()
const request = require('../../../utils/request')
const util = require('../../../utils/util')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    keeper: String,
    keepInfo: String,
    orderInfo: String,
    attrList: Array,
    hasBook: Boolean,
    hasOrder: Boolean,



  },

  returnBook(){
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'ReturnBook/',
        method: 'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded',
        },
        data:{
          documentId: wx.getStorageSync('selectDocumentId'),
        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log('归还图书：', res);
      wx.showToast({
        title: '归还成功',
        icon: 'success',
        success: this.onShow()
      })
    }).catch(err => {
      console.log(err);
    })
  },

  cancelOrder(){
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'CancleBook/',
        method: 'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded',
        },
        data:{
          documentId: wx.getStorageSync('selectDocumentId'),
        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log('取消预约：', res);
      wx.showToast({
        title: '取消预约成功',
        icon: 'success',
        success: this.onShow()
      })
    }).catch(err => {
      console.log(err);
    })
  },

  getBookDetail(){
    wx.navigateTo({
      url: '../../bookInfo/bookDetail/bookDetail',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      keeper: wx.getStorageSync('selectKeeper'),
    })
    request.initKeeperDetail(wx.getStorageSync('selectKeeper')).then(res => {
      console.log('保管人详细信息：', res);
      let temp = res.data;
      let ownBook = temp.ownBook.length===0? '':temp.ownBook[0];
      let orderBook = temp.orderBook.length===0? '':temp.orderBook[0];
      // console.log(ownBook, orderBook);
      let documentId = ownBook===''? orderBook.split(';')[1]:ownBook.split(';')[1];
      wx.setStorageSync('selectDocumentId', documentId);

      this.setData({
        keepInfo: ownBook===''? '暂无':ownBook.split(';')[1] + '借阅至' + ownBook.split(';')[2],
        orderInfo: orderBook===''? '暂无':orderBook.split(';')[1] + '预约至' + orderBook.split(';')[2],
        hasBook: temp.hasBook[0]==='true'? true:false,
        hasOrder: temp.hasOrder[0]==='true'? true:false,
      })

      let attr = [];
      attr.push({
        attr: '联系电话',
        val: temp.phoneNumber[0]
      })
      attr.push({
        attr: '保管人类型',
        val: temp.type[0]
      })
      if(temp.stuId[0]!=='undefined'){
        attr.push({
          attr: '学号',
          val: temp.stuId[0]
        })
      }

      this.setData({
        attrList: attr
      })


    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})