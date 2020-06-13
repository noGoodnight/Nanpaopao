// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-g55yu',
  traceUser: true,
})

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  user = await db.collection('users').where({
    openId: wxContext.OPENID,
  }).get()
  return user.data.length > 0
}