
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : 0,
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],  // 月份字符串
    name:'defa_name',
    merchandiseList: ["no data in cloud"],
    url_lis: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
    name:options.name
    })
    console.log(this.data.name)
  },

  onReady: function () {
    console.log("This product is of id: " + this.data.id)
    this.popup = this.selectComponent("#product");
    const db = wx.cloud.database();

    var that = this;

    db.collection('location').get({
      success(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        that.setData({
          merchandiseList: res.data,
        });
      }
    })

    db.collection('img_url').where({
      type: "location_img_url"
    }).get({
      success(res) {
        that.setData({
          url_lis: res.data[0],
        })
      }
    })

    console.log(this.data.url_lis)
  },

  showProduct: function (e) {
    var dbid = e.currentTarget.dataset.index + 1;
    wx.navigateTo({
      url: '../productPage/product?id=' + dbid,
    })
  },
})