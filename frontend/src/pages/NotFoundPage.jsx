import React from "react";
import { Card, Container, Image } from "react-bootstrap";
import "../styles/pages/LoginPage.css";

function NotFoundPage() {
  return (
    <Container className="login-page d-flex flex-column justify-content-center align-items-center">
      <Image src="/static/images/backgrounds/login_bg.jpeg" className="login-bg" />
      <Card className="login-card p-4">
        <Card.Body>
            <p className="fs-12">Halaman Tidak Ditemukan</p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFoundPage;
