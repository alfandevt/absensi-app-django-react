import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { BsSaveFill } from "react-icons/bs";
import { swalAlert, swalConfirm } from "../../utilities/sweetAlert";
import { updateUser } from "../../actions/userListActions";

function FormResetPassword({ id }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch(updateUser(id, { password }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password) {
      swalAlert("Password tidak boleh kosong.");
    } else if (password !== confirmPassword) {
      swalAlert("Password tidak cocok.");
    } else {
      swalConfirm(handleDispatch, {
        titleText: "Yakin ingin merubah password.",
      });
    }
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Reset Password</Card.Title>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="passwordControl"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Form.Text>Kosongkan jika tidak ingin mengubah</Form.Text>
          </FloatingLabel>
          <FloatingLabel
            controlId="confirmPasswordControl"
            label="Konfirmasi Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
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

export default FormResetPassword;
