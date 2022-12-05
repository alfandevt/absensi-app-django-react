import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Form, Image } from "react-bootstrap";
import { BsSaveFill } from "react-icons/bs";
import { uploadFoto } from "../../actions/userActions";

function ProfilePhoto({ foto }) {
  const [file, setFile] = useState("");
  const [fotoUrl, setFotoUrl] = useState(foto || "");
  const [btnDisable, setBtnDisable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFotoUrl(fileUrl);
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [file]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("foto", file);
    dispatch(uploadFoto(formData));
    setFile("");
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-center align-items-center">
        <Image src={fotoUrl} width="200" rounded />
      </Card.Header>
      <Card.Body>
        <Card.Title className="mb-3">Foto Profil</Card.Title>
        <Form className="mb-3" onSubmit={handleSubmit}>
          <Form.Control
            type="file"
            className="mb-3"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/png, image/jpeg"
          />
          <Button className="w-100" type="submit" disabled={btnDisable}>
            Simpan <BsSaveFill />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfilePhoto;
