// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

const db = cloud.database()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含小程序端调用传入的 data
 *
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let adviseCondition = {
    status: event.status,
  }
  if(event.type === 'mine') {
    adviseCondition = {
      _openid: wxContext.OPENID,
      status: event.status,
    }
  }
  const adviseList = await db.collection('advise').where(adviseCondition).get()

  for(let i = 0; i < adviseList.data.length; i +=1) {
    const likePromise = await db.collection('like').where({
      adviseId: adviseList.data[i]._id
    }).count()
    adviseList.data[i].like = likePromise.total

    const replyPromise = await db.collection('reply').where({
      adviseId: adviseList.data[i]._id
    }).count()
    adviseList.data[i].reply = replyPromise.total

    const commentPromise = await db.collection('comment').where({
      adviseId: adviseList.data[i]._id
    }).count()
    adviseList.data[i].comment = commentPromise.total
  }

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）

  return {
    adviseList
  }

}
