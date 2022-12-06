import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  Image,
} from "react-bootstrap";
import "../styles/pages/LoginPage.css";
import { login } from "../actions/userActions";
import { swalAlert } from "../utilities/sweetAlert";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      swalAlert("Isi email atau password dengan lengkap.", { icon: "error" });
    } else {
      dispatch(login(email, password));
    }
  };

  return (
    <Container className="login-page d-flex flex-column justify-content-center align-items-center">
      <Image src="/static/images/backgrounds/login_bg.jpeg" className="login-bg" />
      <Card className="login-card p-4">
        <Card.Header>
          <Card.Title>Login Absensi Online</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form className="mb-3" onSubmit={onSubmit}>
            <FloatingLabel
              controlId="emailControl"
              label="email"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="passwordControl"
              label="password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FloatingLabel>

            <Button type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;
