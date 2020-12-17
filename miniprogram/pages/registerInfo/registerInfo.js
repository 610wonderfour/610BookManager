// pages/registerInfo/registerInfo.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr: ['教师', '学生'],
    isStu: false,



  },

  typeChange: function(e) {
    console.log(e);
    if(e.detail.value === '学生'){
      this.setData({
        isStu: true,
      })
    } else {
      this.setData({
        isStu: false,
      })
    }

  },

  registerInfoSubmit: function(e){
    let data = e.detail.value;
    console.log(data);

    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'RegisterKeeper/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',

        },
        data: {
          'name': data.name,
          'regType': data.regType,
          'phoneNumber': data.phoneNumber,
          'stuId': data.stuId,

        },
        success: res => resolve(res),
        fail: err => resolve(err)
      })
    }).then(res => {
      console.log(res);
      wx.showToast({
        title: '注册成功',
        icon: 'success'
      })
      this.onLoad();

    }).catch(err => {
      console.log(err);
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