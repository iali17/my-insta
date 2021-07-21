import React, { useRef, FormEvent, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import AuthenticationWrapper from "./StylingWrapper";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    setLoading(true);
    try {
      if (emailRef.current && passwordRef.current) {
        await login(emailRef.current.value, passwordRef.current.value)
        history.push('/')
      }
    } catch {
      setError("Failed to sign in. Sadge");
    }
    setLoading(false);
  }

  return (
    <AuthenticationWrapper>
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
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
              <Button disabled={loading} className="w-100" type="submit">Log In</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up!</Link>
        </div>
      </>
    </AuthenticationWrapper>
  )
}
