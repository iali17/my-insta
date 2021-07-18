import React, { useState, FormEvent } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import NewPostForm from './NewPostForm';
import { graphql } from 'babel-plugin-relay/macro';
import type { Environment } from 'react-relay';
import { commitMutation } from 'react-relay';
import { useHistory } from 'react-router-dom';
import { PostInsertType, NewPostScreenAddMutation } from './__generated__/NewPostScreenAddMutation.graphql';

import RelayEnvironment from '../RelayEnvironment';
import { Post } from './Posts'


function commitCreatePostMutation(
  environment: Environment,
  input: PostInsertType,
) {
  return commitMutation<NewPostScreenAddMutation>(environment, {
    mutation: graphql`
      mutation NewPostScreenAddMutation($input: PostInsertType!) {
        newPost(input: $input) {
          id
          image_url
          description
          user
        }
      }
    `,
    variables: {input},
    onCompleted: response => {
      console.log(response);
    } /* Mutation completed */,
    onError: error => {} /* Mutation errored */,
  });
}

export default function NewPostScreen() {
  const history = useHistory();
  let [url, setUrl] = useState('');
  let [description, setDescription] = useState('');

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    //TODO: when we get a singleton for logged in user or something change this
    let args = {user: "bosco", image_url: url, description: description};
    commitCreatePostMutation(RelayEnvironment, args);
    history.push('/');
    history.go(0);
  }

  // TODO: user singleton or something
  let postArgs = {
    id:"postPreview",
    user:"bosco",
    image_url:url,
    description:description,
    comments: []
  }

  return(
    <Container>
      <Row>
        <Col>
          <NewPostForm setUrl={setUrl} setDescription={setDescription} formSubmit={formSubmit}/>
        </Col>
        <Col>
          <h2>Preview</h2>
          <Post post={postArgs}></Post>
        </Col>
      </Row>
    </Container>
  );
}