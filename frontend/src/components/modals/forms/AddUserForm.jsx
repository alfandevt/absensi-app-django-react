import React from "react";
import {
  Modal,
  Button,
  Form,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import Portal from "../../Portal";

function AddUserForm({ show, onHandleHide }) {
  return (
    <Portal wrapperId="portal-modals">
      <Modal show={show} onHide={onHandleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Form.Group className="mb-2">
                <Form.Label>ID Karyawan</Form.Label>
                <Form.Control placeholder="id karyawan" />
              </Form.Group>
              <Row className="mb-2">
                <Col>
                  <Form.Group>
                    <Form.Label>Nama Depan</Form.Label>
                    <Form.Control placeholder="nama depan" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Nama Belakang</Form.Label>
                    <Form.Control placeholder="nama depan" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Form.Label>Tgl. Lahir</Form.Label>
                <Form.Control placeholder="nama depan" type="date" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select>
                  <option>Pilih</option>
                  <option value="l">Laki-laki</option>
                  <option value="p">Perempuan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Alamat</Form.Label>
                <Form.Control placeholder="alamat" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>No. Telp</Form.Label>
                <Form.Control placeholder="no. telp" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="email" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Status Karyawan</Form.Label>
                <Form.Select>
                  <option>Pilih</option>
                  <option value="a">Aktif</option>
                  <option value="t">Tidak Aktif</option>
                </Form.Select>
              </Form.Group>
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Foto</Form.Label>
                    <Form.Control type="file" placeholder="email" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Image width={120} height={120} src="/images/placeholder/Portrait_Placeholder.png" />
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onHandleHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Portal>
  );
}

export default AddUserForm;
