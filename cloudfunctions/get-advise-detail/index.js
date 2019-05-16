

const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const adviseData = await db.collection('advise').where({_id: event.id}).get()

  const adviseDetail = adviseData.data[0]

  const replyPromise = await db.collection('reply').where({
    adviseId: adviseDetail._id
  }).get()

  adviseDetail.reply = replyPromise.data

  const commentPromise = await db.collection('comment').where({
    adviseId: adviseDetail._id
  }).get()

  adviseDetail.comment = commentPromise.data

  return {
    adviseDetail,
  }

}
