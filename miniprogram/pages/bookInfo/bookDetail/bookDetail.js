// pages/bookInfo/bookDetail/bookDetail.js
const app = getApp()
const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    documentId: String,
    attrList: Array,


  },

  initBookDetail(){
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'BookDetail/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          documentId: wx.getStorageSync('selectDocumentId'),
        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log(res);
      let temp = [];
      for(let key in res.data){
        temp.push({
          attr: util.attributeHash(key),
          val: util.valueHash(res.data[key])
        })
      }
      if(temp['保管人']==='onshelf'){
        temp['状态'] = '空闲';
        temp['保管人'] = '暂无';
      } else{
        temp['状态'] = '外借中';
      }

      console.log(temp);
      this.setData({
        attrList: temp
      })

    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      documentId: wx.getStorageSync('selectDocumentId')
    })
    this.initBookDetail();

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