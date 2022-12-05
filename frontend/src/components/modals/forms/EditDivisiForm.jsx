import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { swalAlert } from "../../../utilities/sweetAlert";
import Portal from "../../Portal";

function EditDivisiForm({ detail, show, onHandleHide, onSave }) {
  const [divisi, setDivisi] = useState("");

  useEffect(() => {
    if (detail) {
      setDivisi(detail.nama);
    }
  }, [detail]);

  const renderModalBody = () => {
    if (!detail) {
      return null;
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Container>
          <Form.Group className="mb-2">
            <Form.Label>Divisi*</Form.Label>
            <Form.Control
              placeholder="Divisi IT"
              onChange={(e) => setDivisi(e.target.value)}
              value={divisi}
              type="text"
              maxLength="200"
            />
          </Form.Group>
          <Form.Text className="fs-8">*Wajib diisi</Form.Text>
        </Container>
      </Form>
    );
  };

  const clearForm = () => {
    setDivisi("");
  };

  const handleHide = () => {
    clearForm();
    onHandleHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {};

    if (divisi) {
      formData.nama = divisi;
    }

    if (!formData.nama) {
      swalAlert("Nama Divisi wajib diisi.", { icon: "error" });
    } else {
      onSave(detail.id, formData);
      handleHide();
    }
  };
  return (
    <Portal wrapperId="portal-modals">
      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Divisi</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderModalBody()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Portal>
  );
}

export default EditDivisiForm;
