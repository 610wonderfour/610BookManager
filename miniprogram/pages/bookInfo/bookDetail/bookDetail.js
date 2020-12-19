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
    isBooked: Boolean,



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
      this.setData({
        isLent: res.data['isLent'] === 'true' ? true:false,
      })
      this.setData({
        isBooked: res.data['isBooked'] === 'true' ? true:false,
      })

      if(!this.data.isLent){
        temp.push({
          attr: '状态',
          val: '空闲'
        })
      } else if(this.data.isLent && !this.data.isBooked){
        temp.push({
          attr: '状态',
          val: '外借中'
        })
        temp.push({
          attr: '保管人',
          val: res.data['keeper']
        })
      } else{
        temp.push({
          attr: '状态',
          val: '外借中 + 预约中'
        })
        temp.push({
          attr: '保管人',
          val: res.data['keeper']
        })
        temp.push({
          attr: '预约人',
          val: res.data['booker']
        })

      }

      for(let key in res.data){
        if(key==='keeper' || key==='booker' || key==='isLent' || key==='isBooked'){
          continue;
        } else{
          temp.push({
            attr: util.attributeHash(key),
            val: util.valueHash(res.data[key])
          })
        }
      }


      console.log('图书属性参数', temp);
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
    wx.navigateTo({
      url: './bookOrder/bookOrder',
    })
  },
  
  getKeeperInfo(){

  },

  handleBuyer(){
    let that = this;
    wx.showActionSheet({
      itemList: this.data.isLent? ['我要借书', '我要预约']:['我要借书'],
      success: function(res){
        console.log(res);
        switch(res.tapIndex){
          case 0:
            that.lendBook();
            break;
          case 1:
            that.bookOrder();
            break;
        }
      },
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