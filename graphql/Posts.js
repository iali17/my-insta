import { limitQueryWithId, applyPagination } from './utils.js'
import { ObjectID } from 'bson';

export async function getPosts(mongodb, {first, last, before, after }) {
  const collection = await mongodb.collection('posts');
  let [query, hasBefore, hasAfter] = await limitQueryWithId(
    collection,
    before,
    after
  );
  const pageInfo = await applyPagination(
    query, first, last, hasBefore, hasAfter
  );
  
  return {
    query,
    pageInfo
  };
}

export async function updateOnePost(mongodb, args) {
  const collection = await mongodb.collection('posts');
  let updateArgs = {};
  console.assert(args.postId);
  let postId = args.postId;
  if (args.comments) {
    updateArgs.$push = {"comments": { "$each": args.comments}}
  }
  delete args.comments
  delete args.postId
  Object.assign(updateArgs, args);
  
  let updatedPost = await collection.updateOne({_id: ObjectID(postId)}, updateArgs)
  return updatedPost
}

export async function createPost(mongodb, {user, image_url, description}) {
  const collection = await mongodb.collection('posts');
  let newPost;
  try {
    newPost = await collection.insertOne({"image_url": image_url, "user": user, "description": description, date_posted: new Date()});
  } catch (e) {
    console.log(e)
  }
  
  return newPost.ops[0];
}
