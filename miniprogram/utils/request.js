const app = getApp()

module.exports = {
  initKeeperList(){
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'KeeperList/',
        method: 'POST',
        header:{
          'content-type': 'x-www-form-urlencoded',
        },
        data:{

        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    })
  },


}