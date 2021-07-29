import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';
import { ObjectID } from 'bson';

import Cursor from './Cursor.js'
import { getPosts, updateOnePost, createPost } from './Posts.js'
import { getCommentsWithIds, createComment } from './Comments.js'
import { createUser } from './User.js'

export function createConnectionArguments() {
  return {
    first: {
      type: GraphQLInt,
    },
    last: {
      type: GraphQLInt,
    },
    before: {
      type: Cursor,
    },
    after: {
      type: Cursor,
    }
  };
}

export const CommentInsertType = new GraphQLInputObjectType({
  name: 'CommentInsertType',
  description: 'Input payload for creating a comment',
  fields: () => ({
    user: {
      type: new GraphQLNonNull(GraphQLString),
    },
    text: {
      type: GraphQLString,
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID),
    }
  })
})

export const PostInsertType = new GraphQLInputObjectType({
  name: 'PostInsertType',
  description: 'Input payload for creating a post',
  fields: () => ({
    user: {
      type: new GraphQLNonNull(GraphQLString),
    },
    image_url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLID),
    }
  })
})

export const UserInsertType = new GraphQLInputObjectType({
  name: 'UserInsertType',
  description: 'Input payload for creating a user',
  fields: () => ({
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    }
  })
})

export function postUpdateInput() {
  return {
    id: {
      type: GraphQLID,
    },
    comments: {
      type: new GraphQLList(GraphQLID)
    },
    user: {
      type: GraphQLString,
    },
    image_url: {
      type: GraphQLString
    },
  };
}

export const PageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    startCursor: {
      type: Cursor,
      resolve(parent) {
        return {
          value: parent.startCursor,
        };
      }
    },
    endCursor: {
      type: Cursor,
      resolve(parent) {
        return {
          value: parent.endCursor,
        };
      }
    }
  }
});

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(parent) {
        return parent._id;
      },
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    }
  })
});

const Comment = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(parent) {
        return parent._id;
      },
    },
    text: {
      type: new GraphQLNonNull(GraphQLString)
    },
    user: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }),
});

const Post = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(parent) {
        return parent._id;
      },
    },
    user: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    image_url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve(parent, args, { mongodb }) {
        return getCommentsWithIds(mongodb, parent.comments);
      }
    }
  }),
});

const PostEdge = new GraphQLObjectType({
  name: 'PostEdge',
  fields: () => ({
    cursor: {
      type: Cursor,
      resolve(parent) {
        return {
          value: parent._id,
        };
      },
    },
    node: {
      type: Post,
      resolve(parent) {
        return parent;
      },
    },
  }),
});

const PostConnection = new GraphQLObjectType({
  name: 'PostConnection',
  fields: () => ({
    edges: {
      type: new GraphQLList(PostEdge),
      resolve(parent) {
        return parent.query.toArray();
      },
    },
    pageInfo: {
      type: new GraphQLNonNull(PageInfo),
      resolve(parent) {
        return parent.pageInfo;
      }
    },
  }),
});

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    allPosts: {
      type: PostConnection,
      args: createConnectionArguments(),
      resolve(parent, args, { mongodb }) {
        return (getPosts(mongodb, args));
      },
    },
  }),
});


const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      viewer: {
        type: Viewer,
        resolve() {
          return {
            id: 'VIEWER_ID',
          };
        }
      }
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      insertOneComment: {
        type: Comment,
        args: {
          input: {
            type: new GraphQLNonNull(CommentInsertType)
          }
        },
        resolve(parent, args, { mongodb }) {
          let commentArgs = {text: args.input.text, user: args.input.user}
          let comment = createComment(mongodb, commentArgs)
          comment.then(value => {
            updateOnePost(mongodb, {postId: args.input.postId, comments: [ObjectID(value._id)]})
            return value;
          })
          return comment;
        }
      },
      updatePost: {
        type: Post,
        args: postUpdateInput(),
        resolve(parent, args, {mongodb}) {
          return parent;
        }
      },
      newPost: {
        type: Post,
        args: {
          input: {
            type: new GraphQLNonNull(PostInsertType)
          }
        },
        resolve(parent, args, { mongodb }) {
          let postArgs = {user: args.input.user, image_url: args.input.image_url, description: args.input.description}
          return createPost(mongodb, postArgs);
        }
      },
      newUser: {
        type: User,
        args: {
          input: {
            type: new GraphQLNonNull(UserInsertType)
          }
        },
        resolve(parent, args, { mongodb }) {
          let userArgs = {username: args.input.username, description: args.input.description, name: args.input.name, email: args.input.email}
          return createUser(mongodb, userArgs);
        }
      }
    }
  })
});

export default Schema