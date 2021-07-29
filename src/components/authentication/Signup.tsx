import React, { useRef, FormEvent, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { graphql } from 'babel-plugin-relay/macro';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import AuthenticationWrapper from "./StylingWrapper";
import type { Environment } from 'react-relay';
import { commitMutation } from 'react-relay';

import { UserInsertType, SignupUserAddMutation } from './__generated__/SignupUserAddMutation.graphql';


function commitCreateCommentMutation(
  environment: Environment,
  input: UserInsertType,
) {
  return commitMutation<SignupUserAddMutation>(environment, {
    mutation: graphql`
      mutation SignupUserAddMutation($input: UserInsertType!) {
        newUser(input: $input) {
          id
          username
        }
      }
    `,
    variables: {input},
    onCompleted: response => {
      console.log(response)
    } /* Mutation completed */,
    onError: error => {} /* Mutation errored */,
  });
}

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (passwordRef.current && passwordConfirmRef.current && passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match! Please try again.")
    }

    setLoading(true);
    try {
      // TODO: need to check if username is unique. email is automatically checked.
      if (emailRef.current && passwordRef.current) {
        await signup(emailRef.current.value, passwordRef.current.value)
        // TODO: create a unique username in mongodb -> associate with email
        history.push('/')
      }
    } catch {
      setError("Failed to create an Account. PepeHands");
    }
    setLoading(false);
  }

  return (
    <AuthenticationWrapper>
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="passwordConfirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">Sign Up</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </>
    </AuthenticationWrapper>
  )
}
