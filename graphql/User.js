export async function createUser(mongodb, {username, email, description, name}) {
  const collection = await mongodb.collection('users');
  let newUser;
  try {
    newUser = await collection.insertOne({"username": username, "email": email, "description": description, "name": name});
  } catch (err) {
    // we hit the unique index we built for the username/email
    let errorKey, errorValue;
    if (err.code === 11000) {
      // this is to extract the value from the object that is passed
      // looping through it even though its just 1 thing is faster than Object.keys and Object.values
      for(var key in err.keyValue) {
        errorKey = key;
        errorValue = err.keyValue[key]
      }
      throw new Error("The " + errorKey + " " + errorValue + " is already taken. Please try again with a different " + errorKey);
    }
    // catch any generic error
    throw err
  }
  
  return newUser.ops[0];
}

