import { filterByIdList } from './utils.js'

export async function getCommentsWithIds(mongodb, comments) {
  const collection = await mongodb.collection('comments');
  let query = await filterByIdList(collection, comments);
  return (await query.toArray());
}

export async function createComment(mongodb, {text, user}) {
  const collection = await mongodb.collection('comments');
  let insertedComment
  try {
    insertedComment = await collection.insertOne({"text": text, "user": user});
  } catch (e) {
    console.log(e)
  }
  
  return insertedComment.ops[0];
}
