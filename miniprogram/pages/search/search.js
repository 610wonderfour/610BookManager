// pages/search/search.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
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
      console.log('库存图书种类列表', res);
      let data = res.data;
      let temp = [];
      for(let key in data){
        temp.push({
          name: key,
          lend_num: data[key][0],
          left_num: data[key][1],
          book_num: data[key][2]
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
    let searchInfo = e.detail.value;
    let data = {};
    for(let key in searchInfo){
      if(searchInfo[key]!==""){
        data[key] = searchInfo[key];
      }
    }
    console.log(data);
    
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'BookList/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: data,
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log(res);
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

  getBookInfo(e){
    // console.log(e);
    let name = e.currentTarget.dataset.item.name;
    // console.log(name);
    wx.setStorageSync('selectBookName', name);

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
    this.initBookList();

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