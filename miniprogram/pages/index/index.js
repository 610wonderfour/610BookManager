//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }


  },

  addNewTap: function() {
    wx.navigateTo({
      url: '../addNewBook/addNewBook',
    })
  },

  registerTap: function() {
    wx.navigateTo({
      url: '../registerInfo/registerInfo',
    })
  },

  searchTap: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  keeperTap: function() {
    wx.navigateTo({
      url: '../keeperInfo/keeperInfo',
    })
  },


  

})
