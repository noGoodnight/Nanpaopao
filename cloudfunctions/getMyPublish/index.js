// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-g55yu',
  traceUser: true,
})

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var list1 = [];
  console.log(1)
  try {
      await db.collection('orders').get({
      success: function (res) {
        console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].pusherId == myopenid) {
            list1.push(res.data[i])
          }
        }
      }
    })
    }catch(e){
      console.log(e)
    }

    return{
      publish:list1
    };


}