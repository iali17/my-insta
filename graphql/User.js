import { limitQueryWithId } from './utils.js'
import { ObjectID } from 'bson';

export async function createUser(mongodb, {username, email, description, name}) {
  const collection = await mongodb.collection('users');
  let newUser;
  try {
    newUser = await collection.insertOne({"username": username, "email": email, "description": description, "name": name});
  } catch (e) {
    console.log("errored here: ", e)
  }

  console.log("this is the new user:", newUser)
  
  // return newUser.ops[0];
}

