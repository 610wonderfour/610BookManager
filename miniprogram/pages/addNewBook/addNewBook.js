// pages/addNewBook/addNewBook.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: String,
    bookName: String,
    boughtTime: '2020-12-17',
    buyer: String,
    bookLocation: String,
    bookCopyId: String,


  },

  datePickerChange: function(e){
    this.setData({
      boughtTime: e.detail.value,
    })
  },

  addBook: function(e){
    // console.log(e.detail.value);
    let data = e.detail.value;
    // console.log(data.boughtTime);

    new Promise((resolve, reject) => {
      console.log(data);
      wx.request({
        url: app.globalData.url + 'AddNewBook/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          'bookId': data.bookId,
          'bookName': data.bookName,
          'price': data.price,
          'boughtTime': data.boughtTime,
          'buyer': data.buyer,
          'bookLocation': data.bookLocation,
          'groupId': data.groupId,

        },
        success: res => resolve(res),
        fail: error => reject(error)
        
      })
    }).then(res => {
      console.log(res);

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