// pages/bookInfo/bookDetail/bookOrder/bookOrder.js
const app = getApp()
const request = require('../../../../utils/request')
const util = require('../../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keeperList: Array,
    periodList: Array,
    keepTime: String,
    keepTimeFormat: String,


  },

  initPeriodList(){
    let month = [], day = [];
    for(let i=0; i<=12; i++){
      month.push(i + '个月');
    }
    for(let i=0; i<=31; i++){
      day.push(i + '天');
    }
    // console.log(month, day);
    this.setData({
      periodList: [month, day]
    })
  },

  keeperChange(e){

  },

  periodPickerChange(e){
    let month = e.detail.value[0];
    let day = e.detail.value[1];
    // console.log(e.detail.value);
    this.setData({
      keepTime: month + '个月' + day + '天',
      keepTimeFormat: util.formatPeriod(month, day)
    })
    // console.log('预约借书时长：', this.data.keepTime, this.data.keepTimeFormat);

  },

  bookSubmit(e){
    let keeper = e.detail.value.keeper;
    let keepTimeFormat = this.data.keepTimeFormat;
    console.log('所选保管人：', keeper);
    console.log('借书时长：', keepTimeFormat)
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'BookOrder/',
        method: 'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded',
        },
        data:{
          documentId: wx.getStorageSync('selectDocumentId'),
          keeper: keeper,
          keepTime: keepTimeFormat,
        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log(res);
      wx.showToast({
        title: '预约成功！',
        icon: 'success',
        success: wx.navigateBack({
          delta: 1,
        })
      })


    }).catch(err => {
      console.log(err);
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPeriodList();

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
          hasBook: attr.hasBook[0] === 'true' ? true:false,
          hasOrder: attr.hasOrder[0] === 'true' ? true:false,
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