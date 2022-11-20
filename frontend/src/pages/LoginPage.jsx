import React from "react";
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <Container className="login-page d-flex flex-column justify-content-center align-items-center">
      <Image src="/images/backgrounds/login_bg.jpeg" className="login-bg" />
      <Card className="login-card p-4">
        <Card.Header>
          <Card.Title>Login Absensi Online</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form className="mb-3" onSubmit={onSubmit}>
            <FloatingLabel
              controlId="usernameControl"
              label="username"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="username" />
            </FloatingLabel>
            <FloatingLabel
              controlId="passwordControl"
              label="password"
              className="mb-3"
            >
              <Form.Control type="password" placeholder="password" />
            </FloatingLabel>
            <Form.Check
              type="switch"
              id="remember"
              label="Remember me"
              className="mb-3"
            />
            <Button type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <Card.Text>
            <Link to="/lupa">Lupa Password?</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;
