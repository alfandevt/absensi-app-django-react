import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { BsSaveFill } from "react-icons/bs";
import { swalAlert, swalConfirm } from "../../utilities/sweetAlert";
import { updateUser } from "../../actions/userListActions";
import { emailValidator } from "../../utilities/fieldValidator";

function FormBase({ id, nama_lengkap, email, is_staff }) {
  const [namaLengkap, setNamaLengkap] = useState(nama_lengkap || "");
  const [emailUser, setEmailUser] = useState(email || "");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {};

    if (namaLengkap) {
      formData.nama_lengkap = namaLengkap;
    }

    if (emailUser) {
      formData.email = emailUser;
    }

    if (!formData.nama_lengkap) {
      swalAlert("Nama Lengkap tidak boleh kosong.", { icon: "error" });
    } else if (!formData.email) {
      swalAlert("Email tidak boleh kosong.", { icon: "error" });
    } else if (!emailValidator(formData.email)) {
      swalAlert("Format email salah.", { icon: "error" });
    } else {
      const handleDispatch = () => {
        dispatch(updateUser(id, formData));
      };

      swalConfirm(handleDispatch, {
        titleText: "Yakin ingin merubah data?",
      });
    }
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Profil Karyawan</Card.Title>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="nameControl"
            label="Nama Lengkap"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onChange={(e) => setNamaLengkap(e.target.value)}
              value={namaLengkap}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="emailControl"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              onChange={(e) => setEmailUser(e.target.value)}
              value={emailUser}
            />
          </FloatingLabel>
          <FloatingLabel label="Level User" className="mb-3">
            <Form.Control
              value={is_staff ? "Administrator" : "Karyawan"}
              readOnly
              disabled
            />
          </FloatingLabel>
          <Button type="submit" className="w-100">
            Simpan <BsSaveFill />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FormBase;
