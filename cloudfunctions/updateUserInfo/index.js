// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-g55yu',
  traceUser: true,
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    var flag=false
    db.collection('orders').get({
      success: function (res) {
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].openId==wxContext.OPENID){
            flag=true
            break
          }
        }
      }
    })
    if(flag){
      return await db.collection("users").where({
        openId:event.openId
      }).update({
        data: {
          userName:event.userName,
          studentId:event.studentId,
          pictures:event.pictures,
        }
      })
    }else{
      return await db.collection('users').add({
        data: 
          {
            openId:wxContext.OPENID,
            userName:event.userName,
            studentId:event.studentId,
            pictures:event.pictures,
          }
      })
    }
    
  }catch(e){
    console.error(e)
  }
}