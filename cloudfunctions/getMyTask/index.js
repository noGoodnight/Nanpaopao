// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  await db.collection('orders').get({
    success: function (res) {
      var list2 = []
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].pullerId == myopenid && res.data[i].isFinished == false) {
          list2.push(res.data[i])
        }
      }
      return {list2}
    }
  })
}