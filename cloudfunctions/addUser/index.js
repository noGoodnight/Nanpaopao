
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('users').add({
    data: 
      {
        openId:wxContext.OPENID,
        userName:event.userName,
        studentId:event.studentId,
        cloudPath:event.cloudPath,
      }
  })
  } catch (e) {
    console.error(e)
  }
}