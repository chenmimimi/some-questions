// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('advise').where({
    _id: event.id
  }).remove()
  await db.collection('like').where({
    adviseId: event.id
  }).remove()
  await db.collection('reply').where({
    adviseId: event.id
  }).remove()
  await db.collection('comment').where({
    adviseId: event.id
  }).remove()

  return {}
}
