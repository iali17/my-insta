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
import Navbar from './Navbar';



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
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const username = window.localStorage.getItem('username')
  if (!username) throw Error("Username was not set! try re-logging.")

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let args = {user: username, image_url: url, description: description};
    commitCreatePostMutation(RelayEnvironment, args);
    history.push('/');
    history.go(0);
  }

  let postArgs = {
    id:"postPreview",
    user:username,
    image_url:url,
    description:description,
    comments: []
  }

  return(
    <>
      <Navbar></Navbar>
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
    </>
  );
}