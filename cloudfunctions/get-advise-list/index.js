const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let adviseCondition = {
    status: event.status,
  }
  if(event.type === 'mine') {
    adviseCondition = {
      openid: wxContext.OPENID,
      status: event.status,
    }
  }
  const adviseList = await db.collection('advise').where(adviseCondition).get()

  for(let i = 0; i < adviseList.data.length; i +=1) {
    let currentAdvise = adviseList.data[i]
    const likePromise = await db.collection('like').where({
      adviseId: currentAdvise._id
    }).count()
    const youLike = await db.collection('like').where({
      adviseId: currentAdvise._id,
      openid: wxContext.OPENID,
    }).count()
    currentAdvise.like = likePromise.total
    currentAdvise.youLike = youLike.total

    const replyPromise = await db.collection('reply').where({
      adviseId: currentAdvise._id
    }).count()
    const youReply = await db.collection('reply').where({
      adviseId: currentAdvise._id,
      openid: wxContext.OPENID,
    }).count()
    currentAdvise.reply = replyPromise.total
    currentAdvise.youReply = youReply.total

    const commentPromise = await db.collection('comment').where({
      adviseId: currentAdvise._id
    }).count()
    const youComment = await db.collection('comment').where({
      adviseId: currentAdvise._id,
      openid: wxContext.OPENID,
    }).count()
    currentAdvise.comment = commentPromise.total
    currentAdvise.youComment = youComment.total
  }

  return {
    adviseList
  }

}
