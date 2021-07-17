import React, { useState, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { HomeScreenQueryResponse } from './__generated__/HomeScreenQuery.graphql';
import { OperationType } from 'relay-runtime';
import { PreloadedQuery } from 'react-relay';
import { HeartFill, Chat, CloudHaze, Bookmark, Heart } from 'react-bootstrap-icons';
import type { Environment } from 'react-relay';
import { commitMutation } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { CommentInsertType, PostsAddCommentMutation } from './__generated__/PostsAddCommentMutation.graphql';

import AutoSizedTextArea from './AutoSizedTextArea';
import { HomeScreenQuery } from './HomeScreen';
import RelayEnvironment from '../RelayEnvironment';


function commitCreateCommentMutation(
  environment: Environment,
  input: CommentInsertType,
  callback: (newComment: { id: string; user: string; text: string;}) => void
) {
  return commitMutation<PostsAddCommentMutation>(environment, {
    mutation: graphql`
      mutation PostsAddCommentMutation($input: CommentInsertType!) {
        insertOneComment(input: $input) {
          id
          text
          user
        }
      }
    `,
    variables: {input},
    onCompleted: response => {
      callback(response.insertOneComment!)
    } /* Mutation completed */,
    onError: error => {} /* Mutation errored */,
  });
}

type nodeType = {
  readonly id: string;
  readonly user: string;
  readonly image_url: string;
  readonly description: string | null;
  readonly comments: readonly ({
    readonly id: string;
    readonly user: string;
    readonly text: string;
  } | null)[] | null;
}


export function PostList(props: { preloadedQuery: PreloadedQuery<OperationType, {}>; }) {
  const data = usePreloadedQuery(HomeScreenQuery, props.preloadedQuery) as HomeScreenQueryResponse;
  if (data.viewer && data.viewer.allPosts) {
    return (
      <div>
          {data.viewer.allPosts.edges?.map((post) => (
            <Post key={post?.node!.id!} post={post?.node!} />
          ))}
      </div>
    );
  } else {
    return (<div>The database query is wrong or did not return what we expect.</div>);
  }

}


function Post(props: { post: nodeType }) {
  const [comments, setComments] = useState(props.post.comments || [])

  const addComment = (newComment: {id: string, user: string, text: string}) => {
    setComments([
      ...comments,
      {
        id: newComment.id,
        user: newComment.user,
        text: newComment.text
      }
    ])
  }

  return (
    <div className="card text-white bg-dark mt-2" style={{ minWidth: "500px", maxWidth: "614px" }}>
      <Picture picture={props.post.image_url} />
      <Actions />
      <p><b>{props.post.user}</b> {props.post.description}</p>
      <CommentList comments={comments} />
      {/* TODO: the user that adds this comment should not be the post user haha */}
      <CommentAdd postId={props.post.id} user={props.post.user} addComment={addComment} />
    </div>
  );
}


function CommentAdd(props: { postId: string, user: string, 
  addComment: (newComment: { id: string; user: string; text: string;}) => void }) {
  const commentAddForm = React.createRef<HTMLFormElement>();
  const [comment, setComment] = useState('');

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let args = {postId: props.postId, user: props.user, text: comment};
    commitCreateCommentMutation(RelayEnvironment, args, props.addComment);
    commentAddForm.current?.reset();
  }

  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // if you press enter and not shift + enter
    if (e.key === "Enter" && e.shiftKey === false && commentAddForm.current) {
      e.preventDefault();
      commentAddForm.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }
  }

  return (
    <div className="container mb-2">
      <form onSubmit={formSubmit} id="comment_add" ref={commentAddForm}>
        <div className="form-group">
          <AutoSizedTextArea onKeyDown={onEnterPress} 
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)}
          submit="Post"
          />
        </div>
      </form>
    </div>
  );
}


function Actions() {
  const [isLiked, setLiked] = useState(false);

  const likeIconClicked = () => {
    setLiked(!isLiked);
  }

  const likeIcon = () => {
    if (isLiked) {
      return (
        <HeartFill className="col-auto fill-red" onDoubleClick={likeIconClicked} />
      );
    } else {
      return (
        <Heart className="col-auto" onDoubleClick={likeIconClicked} />
      );
    }
  }
  return (
    <div className="container">
      <div className="row fs-3 mb-2 mt-2">
        {likeIcon()}
        <Chat className="col-auto" />
        <CloudHaze className="col-auto me-auto" />
        <Bookmark className="col-auto" />
      </div>
    </div>

  );
}


function CommentList(props: {
  readonly comments: readonly ({
    readonly id: string;
    readonly user: string;
    readonly text: string;
  } | null)[] | null;
}) {
  return (
    <ul className="list-unstyled">
      {props.comments?.map(comment => (
        <li key={comment!.id}><b>{comment?.user}</b> {comment?.text}</li>
      ))}
    </ul>
  );
}


function Picture(props: { picture: string }) {
  return (
    <div className="mx-auto d-flex align-items-center" style={{ height: '600px', width: '100%', overflow: 'hidden' }}>
      <img className="card-img-top user-select-none" src={props.picture} alt="This could be you" />
    </div>
  );
}
