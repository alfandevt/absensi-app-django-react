import React, { useState } from "react";
import { Card, FloatingLabel, Form } from "react-bootstrap";

function ProfileBaseInfo({ nama_lengkap, email, is_staff }) {
  const [namaLengkap, setNamaLengkap] = useState(nama_lengkap || "");
  const [emailUser, setEmailUser] = useState(email || "");
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Profil User</Card.Title>
        <Form>
          <FloatingLabel
            controlId="nameControl"
            label="Nama Lengkap"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onChange={(e) => setNamaLengkap(e.target.value)}
              value={namaLengkap}
              readOnly
              disabled
            />
            <Form.Text>
              Pastikan nama telah valid atau hubungi admin untuk merubahnya.
            </Form.Text>
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
              readOnly
              disabled
            />
            <Form.Text>
              Hubungi admin jika ingin melakukan perubahan email login.
            </Form.Text>
          </FloatingLabel>
          <FloatingLabel label="Level User" className="mb-3">
            <Form.Control
              value={is_staff ? "Administrator" : "Karyawan"}
              readOnly
              disabled
            />
          </FloatingLabel>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfileBaseInfo;
