import React from "react";
import { Modal, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import FormBase from "../../forms/FormBase";
import FormDeactivate from "../../forms/FormDeactivate";
import FormDetail from "../../forms/FormDetail";
import FormPhoto from "../../forms/FormPhoto";
import FormResetPassword from "../../forms/FormResetPassword";
import Portal from "../../Portal";

function DetailUserForm({ show, onHandleHide, detail }) {
  const renderModalBody = () => {
    if (!detail) {
      return <Spinner />;
    }

    return (
      <Row>
        <Col md="6" xs="12">
          <Row className="mb-4">
            <Col xs="12" className="mb-4">
              <FormBase {...detail} />
            </Col>
            <hr />
            <Col xs="12">
              <FormPhoto {...detail} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col xs="12" className="mb-4">
              <FormDetail {...detail.profil} />
            </Col>
            <hr />
            <Col xs="12" className="mb-4">
              <FormResetPassword {...detail} />
            </Col>
            <hr />
            <Col xs="12">
              <FormDeactivate {...detail} onHandleHide={onHandleHide} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Portal wrapperId="portal-modals">
      <Modal fullscreen show={show} onHide={onHandleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Karyawan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <h1>Detail Karyawan</h1>
            <hr />
            {renderModalBody()}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleHide}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Portal>
  );
}

export default DetailUserForm;
