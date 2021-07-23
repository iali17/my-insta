import React, { useRef, FormEvent, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthenticationWrapper from "./StylingWrapper";

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('')


    setLoading(true);
    try {
      if (emailRef.current) {
        await resetPassword(emailRef.current.value)
        setMessage('Email sent! Check the inbox for further instructions.')
      }
    } catch {
      setError("Failed to reset password. Sadge");
    }
    setLoading(false);
  }

  return (
    <AuthenticationWrapper>
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">Send Confirmation</Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mb-2">
            <Link to="/login">Login</Link>
          </div>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up!</Link>
        </div>
      </>
    </AuthenticationWrapper>
  )
}
