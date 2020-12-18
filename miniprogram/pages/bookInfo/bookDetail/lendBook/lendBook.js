// pages/bookInfo/bookDetail/lendBook/lendBook.js
const app = getApp()
const request = require('../../../../utils/request')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    keeperList: Array,
    keepTime: String,


  },

  datePickerChange(e){
    console.log(e.detail.value);
    this.setData({
      keepTime: e.detail.value,
    })
  },


  lendSubmit(e){
    let keeper = e.detail.value.keeper;
    let keepTime = e.detail.value.keepTime;
    console.log('所选保管人：', keeper);
    console.log('截止日期：', keepTime)
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'LendBook/',
        method: 'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded',
        },
        data:{
          documentId: wx.getStorageSync('selectDocumentId'),
          keeper: keeper,
          keepTime: keepTime,
        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log(res);
      wx.showToast({
        title: '借阅成功！',
        icon: 'success',
        success: wx.navigateBack({
          delta: 1,
        })
      })


    }).catch(err => {
      console.log(err);
    })

  },

  keeperChange(e){

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
    request.initKeeperList().then(res => {
      console.log(res);
      let temp = [];
      for(let key in res.data){
        let attr = res.data[key];
        temp.push({
          name: key,
          hasBook: attr.hasBook[0] === 'true' ? true:false,
        })
      }

      this.setData({
        keeperList: temp
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