import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Spinner from "../components/Spinner/Spinner";
import { fetchTimes, updateTimes } from "../actions/timeActions";
import { swalAlert } from "../utilities/sweetAlert";

function SettingPage() {
  const [jamMasuk, setJamMasuk] = useState("");
  const [jamPulang, setJamPulang] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTimes());
  }, [dispatch]);

  const { jamKerja } = useSelector((state) => state.jam);

  useEffect(() => {
    if (jamKerja) {
      setJamMasuk(jamKerja.mulai);
      setJamPulang(jamKerja.selesai);
      setKeterangan(jamKerja.deskripsi);
    }
  }, [jamKerja]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {};
    if (jamMasuk) {
      formData.mulai = jamMasuk;
    }
    if (jamPulang) {
      formData.selesai = jamPulang;
    }
    if (keterangan) {
      formData.deskripsi = keterangan;
    }

    if (!formData.mulai) {
      swalAlert("Jam masuk harus diisi.", { icon: "error" });
    } else if (!formData.selesai) {
      swalAlert("Jam pulang harus diisi.", { icon: "error" });
    } else if (!formData.deskripsi) {
      swalAlert("Keterangan harus diisi.", { icon: "error" });
    } else {
      dispatch(updateTimes(jamKerja.id, formData));
    }
    console.log(formData);
  };

  const renderForm = () => {
    if (!jamKerja) {
      return <Spinner />;
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col xs="3"></Col>
          <Col xs="3">
            <Form.Group>
              <Form.Label>Masuk</Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setJamMasuk(e.target.value)}
                value={jamMasuk}
              />
            </Form.Group>
          </Col>
          <Col xs="3">
            <Form.Group>
              <Form.Label>Pulang</Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setJamPulang(e.target.value)}
                value={jamPulang}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs="3"></Col>
          <Col xs="6">
            <Form.Group>
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setKeterangan(e.target.value)}
                value={keterangan}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs="3"></Col>
          <Col xs="3">
            <Form.Group>
              <Form.Label className="sr-only">&nbsp;</Form.Label>
              <Button type="submit">Simpan</Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Container fluid>
      <h1>Setting Waktu</h1>
      <hr />
      {renderForm()}
    </Container>
  );
}

export default SettingPage;
