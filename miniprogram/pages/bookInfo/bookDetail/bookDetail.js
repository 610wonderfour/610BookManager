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
    isLent: Boolean,



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
      console.log('图书属性参数', res);
      let temp = [];
      for(let key in res.data){
        if(key === 'keeper'){
          if(res.data[key] === 'onshelf'){
            temp.push({
              attr: '状态',
              val: '空闲'
            })
            temp.push({
              attr: '保管人',
              val: '暂无'
            })
          } else{
            temp.push({
              attr: '状态',
              val: '外借中'
            })
            temp.push({
              attr: '保管人',
              val: res.data[key]
            })
          }

        } else if(key === 'isLent'){
          this.setData({
            isLent: res.data[key] === 'true' ? true:false
          })
          temp.push({
            attr: util.attributeHash(key),
            val: util.valueHash(res.data[key])
          })
        } else{
          temp.push({
            attr: util.attributeHash(key),
            val: util.valueHash(res.data[key])
          })
        }
      }


      console.log(temp);
      this.setData({
        attrList: temp
      })

    }).catch(err => {
      console.log(err);
    })
  },

  lendBook(){
    wx.navigateTo({
      url: './lendBook/lendBook',
    })
  },

  bookOrder(){

  },
  
  getKeeperInfo(){

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
      documentId: wx.getStorageSync('selectDocumentId'),
    })
    this.initBookDetail();

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