import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';

export default function NavigationBar() {
  const { currentUser, logout } = useAuth();
  return (
    <Navbar variant="dark" bg="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">my-insta</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Form className="d-flex ms-auto">
            <FormControl disabled
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="dark" disabled><Search></Search></Button>
          </Form>
          <Nav className="ms-auto">
            <Nav.Link href="/new/post">New Post</Nav.Link>
            <NavDropdown title={currentUser!.email} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
