const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const pageIndex = event.pageIndex || 1;
  const pageSize = event.pageSize || 10;
  let filters = {}
  if(event.status === 0 || event.status === 1) {
    filters = {
      status: event.status,
    }
    if(event.type === 'mine') {
      filters = {
        openid: wxContext.OPENID,
        status: event.status,
      }
    }
  } else if (event.type === 'mine'){
    filters = {
      openid: wxContext.OPENID,
    }
  }


  const countResult = await db.collection('advise').where(filters).count()
  const total = countResult.total

  const adviseList = await db.collection('advise').where(filters).skip((pageIndex - 1) * pageSize).limit(pageSize).orderBy('createdAt', 'desc').get()

  for(let i = 0; i < adviseList.data.length; i +=1) {
    let currentAdvise = adviseList.data[i]
    // const likePromise = await db.collection('like').where({
    //   adviseId: currentAdvise._id
    // }).count()
    // const youLike = await db.collection('like').where({
    //   adviseId: currentAdvise._id,
    //   openid: wxContext.OPENID,
    // }).count()
    // currentAdvise.like = likePromise.total
    // currentAdvise.youLike = youLike.total

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
    adviseList: {
      list: adviseList.data,
      total
    }
  }

}
