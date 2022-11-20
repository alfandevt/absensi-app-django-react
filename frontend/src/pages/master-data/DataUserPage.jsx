import React from "react";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import AddUserForm from "../../components/modals/forms/AddUserForm";
import Paginator from "../../components/Paginator";
import TableDataUser from "../../components/tables/TableDataUser";

function DataUserPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const handleShowAddForm = () => setShowAddForm(true);
  const handleHideAddForm = () => setShowAddForm(false);

  return (
    <Container fluid>
      <h1>Data User</h1>
      <hr />
      <Row className="mb-4">
        <Col xs="4">
          <Button onClick={handleShowAddForm}>Tambah</Button>
        </Col>
        <Col xs="4" className="sr-only"></Col>
        <Col xs="4">
          <InputGroup>
            <Form.Control type="text" placeholder="Cari user..." />
            <Button>Cari</Button>
          </InputGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="12">
          <TableDataUser />
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="d-flex flex-nowrap justify-content-end">
          <Paginator />
        </Col>
      </Row>
      <AddUserForm show={showAddForm} onHandleHide={handleHideAddForm} />
    </Container>
  );
}

export default DataUserPage;
