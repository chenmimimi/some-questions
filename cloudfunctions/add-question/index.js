// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  await db.collection('advise').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      title: event.title,
      description: event.description,
      status: 0,
      createdAt: new Date(),
      openid: wxContext.OPENID,
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    }
  })
  return {}
}
