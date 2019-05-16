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

  console.log(adviseList)

  return {
    adviseList
  }

}
