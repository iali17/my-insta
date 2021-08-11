import React, { useRef, FormEvent, useState, useEffect } from 'react';
import type { LoginGetEmailQuery } from './__generated__/LoginGetEmailQuery.graphql'
import type { LoginGetUsernameQuery } from './__generated__/LoginGetUsernameQuery.graphql'
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import AuthenticationWrapper from "./StylingWrapper";
import { fetchQuery } from 'relay-runtime';
import { graphql } from 'babel-plugin-relay/macro';
import RelayEnvironment from '../../RelayEnvironment';


const getEmailFromUsername = graphql`
  query LoginGetEmailQuery($input: String!) {
    viewer {
      user(username: $input) {
        email
      }
    }
  }
`;

const getUsernameFromEmail = graphql`
  query LoginGetUsernameQuery($input: String!) {
    viewer {
      user(email: $input) {
        username
      }
    }
  }
`;


function validateEmail(email:string) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


export default function Login() {
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const history = useHistory();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    setLoading(true);
    if (loginRef.current && passwordRef.current && validateEmail(loginRef.current.value)) {
      setUsername(loginRef.current.value);
      setLoading(false);
      fetchQuery<LoginGetUsernameQuery>(
        RelayEnvironment,
        getUsernameFromEmail,
        {input: loginRef.current!.value},
      )
      .subscribe({
        next: (data) => {
          window.localStorage.setItem('username', data.viewer!.user!.username)
        },
        error: (error: any) => {
          // catch all for errors in the query. Should be very unlikely unless server down
          setError(error)
        }
      });
    } else {
      window.localStorage.setItem('username', loginRef.current!.value)
      fetchQuery<LoginGetEmailQuery>(
        RelayEnvironment,
        getEmailFromUsername,
        {input: loginRef.current!.value},
      )
      .subscribe({
        next: (data) => {
          if (data.viewer?.user === null) {
            setError("Could not find anyone with the username " + loginRef.current!.value)
            setLoading(false);
          } else {
            setUsername(data.viewer!.user.email)
          }
        },
        error: (error: any) => {
          // catch all for errors in the query. Should be very unlikely unless server down
          setError(error)
        }
      });
    }
  }

  useEffect(() => {
    async function loginUsingFirebase(username: string) {
      try {
        await login(username, passwordRef.current!.value)
        history.push('/')
      } catch(error: any) {
        setError(error.message);
        setUsername('');
        setLoading(false);
      }
    }
    if (username !== '') {
      loginUsingFirebase(username);
      setUsername('');
    }
  }, [username, history, login])

  return (
    <AuthenticationWrapper>
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="login">
                <Form.Label>Email/Username</Form.Label>
                <Form.Control type="text" placeholder="Email or username" ref={loginRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">Log In</Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mb-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up!</Link>
        </div>
      </>
    </AuthenticationWrapper>
  )
}
