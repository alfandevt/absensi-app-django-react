import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { swalConfirm } from "../../utilities/sweetAlert";
import { deactivateUser } from "../../actions/userListActions";

function FormDeactivate({ id, onHandleHide }) {
  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch(deactivateUser(id));
    onHandleHide();
  };

  const handleClick = () => {
    swalConfirm(handleDispatch, {
      titleText: "Yakin ingin menonaktifkan akun?",
    });
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Non Aktifkan Akun Karyawan</Card.Title>
        <Button onClick={handleClick} variant="danger">
          Non Aktifkan Akun
        </Button>
      </Card.Body>
      <Card.Footer>
        <Card.Text>
          Akun dapat diaktifkan kembali via Dashboard Administrasi.
        </Card.Text>
      </Card.Footer>
    </Card>
  );
}

export default FormDeactivate;
