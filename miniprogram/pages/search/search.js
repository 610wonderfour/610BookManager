// pages/search/search.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [
      {
        name: '三国演义',
        left_num: 3,
        lend_num: 14
      },
    ],
    boughtTime: '',
    

  },

  initBookList() {
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'BookList/',
        method: 'POST',
        header: {

        },
        data: {

        },
        success: res => resolve(res),
        fail: err => reject(err) 
      })
    }).then(res => {
      console.log(res.data);
      let data = res.data;
      let temp = [];
      for(let key in data){
        temp.push({
          name: key,
          left_num: data[key][1],
          lend_num: data[key][0]
        });
      }
      console.log(temp);
      this.setData({
        bookList: temp,
      })
    }).catch(err => {
      console.log(err);
    })
  },

  getBookList(e) {
    let info = e.detail.value;
    console.log(info);
    
    

  },

  getBookInfo(){
    wx.navigateTo({
      url: '../bookInfo/bookInfo',
    })
  },

  datePickerChange(e) {
    this.setData({
      boughtTime: e.detail.value,
    })
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initBookList();
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