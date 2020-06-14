// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    //这里的update依据是event._id
    //console.log(event._id)
    return await db.collection("orders").doc(event._id).remove({
    })
  } catch (e) {
    console.error(e)
  }
}