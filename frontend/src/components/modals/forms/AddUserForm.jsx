import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import {
  emailValidator,
  numberOnlyValidator,
} from "../../../utilities/fieldValidator";
import { swalAlert } from "../../../utilities/sweetAlert";
import Portal from "../../Portal";

function AddUserForm({ show, onHandleHide, onSave }) {
  const [nomorInduk, setNomorInduk] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [noTelp, setNoTelp] = useState("");

  const clearForm = () => {
    setNamaLengkap("");
    setJenisKelamin("");
    setNomorInduk("");
    setEmail("");
    setNoTelp("");
  };

  const handleHide = () => {
    clearForm();
    onHandleHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {};
    const profilData = {};

    if (nomorInduk) {
      profilData.nik = nomorInduk;
    }

    if (namaLengkap) {
      formData.nama_lengkap = namaLengkap;
    }

    if (email) {
      formData.email = email;
    }

    if (jenisKelamin) {
      profilData.jenis_kelamin = jenisKelamin;
    }

    if (noTelp) {
      profilData.no_telp = noTelp;
    }

    if (!profilData.nik) {
      swalAlert("NIK wajib diisi.", { icon: "error" });
    } else if (!numberOnlyValidator(profilData.nik)) {
      swalAlert("NIK hanya menerima angka.", { icon: "error" });
    } else if (!formData.nama_lengkap) {
      swalAlert("Nama Lengkap wajib diisi.", { icon: "error" });
    } else if (!formData.email) {
      swalAlert("Email wajib diisi.", { icon: "error" });
    } else if (!emailValidator(formData.email)) {
      swalAlert("Format email tidak sesuai", { icon: "error" });
    } else {
      formData.password = nomorInduk;
      formData.profil = profilData;
      onSave(formData);
      handleHide();
    }
  };
  return (
    <Portal wrapperId="portal-modals">
      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Akun</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Form.Group className="mb-2">
                <Form.Label>NIK*</Form.Label>
                <Form.Control
                  placeholder="NIK"
                  onChange={(e) => setNomorInduk(e.target.value)}
                  value={nomorInduk}
                  type="tel"
                  maxLength="30"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nama Lengkap*</Form.Label>
                <Form.Control
                  placeholder="nama depan"
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  value={namaLengkap}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select
                  onChange={(e) => setJenisKelamin(e.target.value)}
                  value={jenisKelamin}
                >
                  <option>Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>No. Telp</Form.Label>
                <Form.Control
                  placeholder="no. telp"
                  onChange={(e) => setNoTelp(e.target.value)}
                  value={noTelp}
                />
              </Form.Group>
              <Form.Text className="fs-8">*Wajib diisi</Form.Text>
            </Container>
          </Form>
        </Modal.Body>
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

export default AddUserForm;
