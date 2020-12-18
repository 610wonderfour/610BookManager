// pages/bookInfo/bookInfo.js
const app =getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookName: '610传奇',
    bookList: Array,

  },

  initBookInfo() {
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'BookInfo/',
        method: 'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          name: wx.getStorageSync('selectBookName'),
        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log(res);

    }).catch(err => {
      console.log(err);
    })
  },

  getBookDetail(e){
    let documentId = e.currentTarget.dataset.item.documentId;
    console.log(documentId);
    wx.setStorageSync('selectDocumentId', documentId);
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookName: wx.getStorageSync('selectBookName')
    })
    this.initBookInfo();
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