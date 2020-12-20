// pages/keeperInfo/keeperInfo.js
const app = getApp()
const request = require('../../utils/request')
const util = require('../../utils/util')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    keeperList: Array,

  },


  getKeeperDetail(e){
    console.log(e);
    let keeper = e.currentTarget.dataset.item.name;
    wx.setStorageSync('selectKeeper', keeper);
    wx.navigateTo({
      url: './keeperDetail/keeperDetail',
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
    request.initKeeperList().then(res => {
      console.log('保管人列表:', res);
      let temp = [];
      for(let key in res.data){
        let attr = res.data[key];
        temp.push({
          name: key,
          hasBook: attr.hasBook[0]==='true'? true:false,
          hasOrder: attr.hasOrder[0]==='true'? true:false,
          overDeadline: attr.overDeadline[0]==='true'? true:false,
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