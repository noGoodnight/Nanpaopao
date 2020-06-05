
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-g55yu',
  traceUser: true,
})

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('orders').add({
    data: 
      {
        title:event.title,
        amount:event.amount,
        ddl:event.ddl,
        description:event.description,
        start:event.start,
        end:event.end,
        pullerId:"null",
        pusherId:wxContext.OPENID,
        type:event.type,
        contact:event.contact,
        isFinished:false,
        publishTime:event.publishTime,
        DDLinMillisecond:event.DDLinMillisecond
      }
  })
  } catch (e) {
    console.error(e)
  }
}