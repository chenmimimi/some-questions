// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  await db.collection('advise').where({
    _id: event.id
  }).update({
    // data 字段表示需新增的 JSON 数据
    data: {
      status: event.status
    }
  })
  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  return {}
}
