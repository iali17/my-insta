import React, { useRef, FormEvent, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { graphql } from 'babel-plugin-relay/macro';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import AuthenticationWrapper from "./StylingWrapper";
import type { Environment } from 'react-relay';
import { commitMutation } from 'react-relay';
import RelayEnvironment from '../../RelayEnvironment';

import { UserInsertType, SignupUserAddMutation } from './__generated__/SignupUserAddMutation.graphql';


function commitCreateUserMutation(
  environment: Environment,
  input: UserInsertType,
  setError: (value: React.SetStateAction<string>) => void,
  callback: () => Promise<void>
) {
  return commitMutation<SignupUserAddMutation>(environment, {
    mutation: graphql`
      mutation SignupUserAddMutation($input: UserInsertType!) {
        newUser(input: $input) {
          username
        }
      }
    `,
    variables: { input },
    onCompleted: (response, errors) => {
      if (errors !== undefined && errors !== null && errors.length === 1) {
        setError(errors[0].message);
      }
      callback();
    } /* Mutation completed */,
    onError: error => {} /* Mutation errored */,
  });
}

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  async function createFirebaseUser() {
    try {
      if (emailRef.current && passwordRef.current) {
        if (!error) {
          await signup(emailRef.current.value, passwordRef.current.value)
          history.push('/')
        }
      }
    } catch (error: any) {
      // firebase has a nicely formatted message when it fails
      setError(error.message);
    }
    setLoading(false);
  }


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (passwordRef.current && passwordConfirmRef.current && passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Password do not match! Please try again.")
      return
    }

    setLoading(true);
    if (emailRef.current && passwordRef.current && usernameRef.current && nameRef.current) {
      let args = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        name: nameRef.current.value,
        description: ""
      };
      commitCreateUserMutation(RelayEnvironment, args, setError, createFirebaseUser)
    }
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
                <Form.Control type="email" placeholder="Email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" ref={usernameRef} required />
              </Form.Group>
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Full Name" ref={nameRef} required />
                <small>Your real name will help people recognize you!</small>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="passwordConfirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordConfirmRef} required />
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
