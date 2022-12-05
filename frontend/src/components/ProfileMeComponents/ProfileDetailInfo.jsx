import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { BsSaveFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { fetchDivisi } from "../../actions/divisiActions";
import { updateMe } from "../../actions/userActions";

function ProfileDetailInfo({ nik, no_telp, tgl_lahir, jenis_kelamin, divisi }) {
  const [nomorInduk, setNomorInduk] = useState(nik || "");
  const [noTelp, setNoTelp] = useState(no_telp || "");
  const [tglLahir, setTglLahir] = useState(tgl_lahir || "");
  const [jenisKelamin, setJenisKelamin] = useState(jenis_kelamin || "");
  const [divisiKerja, setDivisiKerja] = useState(divisi || "");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDivisi());
  }, [dispatch]);

  const { divisiList } = useSelector((state) => state.divisi);

  const renderDivisiOption = () => {
    if (!divisiList) {
      return null;
    }
    return divisiList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.nama}
      </option>
    ));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");

    const formData = {};

    if (noTelp) {
      formData.no_telp = noTelp;
    }

    if (tglLahir) {
      formData.tgl_lahir = tglLahir;
    }

    if (jenisKelamin) {
      formData.jenis_kelamin = jenisKelamin;
    }

    if (divisiKerja) {
      formData.divisi = divisiKerja;
    }

    dispatch(updateMe({ profil: formData }));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Detail Karyawan</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nikControl" label="NIK" className="mb-3">
            <Form.Label>NIK</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setNomorInduk(e.target.value)}
              value={nomorInduk}
              readOnly={true}
              placeholder="NIK"
              disabled
            />
            <Form.Text>Hubungi admin untuk melakukan perubahan NIK</Form.Text>
          </Form.Group>
          <Form.Group controlId="telpControl" label="No. Telp" className="mb-3">
            <Form.Label>No. Telp</Form.Label>
            <Form.Control
              type="telp"
              onChange={(e) => setNoTelp(e.target.value)}
              value={noTelp}
              placeholder="isi no. telp"
            />
          </Form.Group>
          <Form.Group
            controlId="tglControl"
            label="Tgl. Lahir"
            className="mb-3"
          >
            <Form.Control
              type="date"
              onChange={(e) => setTglLahir(e.target.value)}
              value={tglLahir}
            />
          </Form.Group>
          <Form.Group
            controlId="tglControl"
            label="Jenis Kelamin"
            className="mb-3"
          >
            <Form.Select
              onChange={(e) => setJenisKelamin(e.target.value)}
              value={jenisKelamin}
            >
              <option>Pilih</option>
              <option value={"L"}>Laki-laki</option>
              <option value={"P"}>Perempuan</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="divisiControl" label="Divisi" className="mb-3">
            <Form.Select
              onChange={(e) => setDivisiKerja(e.target.value)}
              value={divisiKerja}
            >
              <option>Pilih</option>
              {renderDivisiOption()}
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="w-100">
            Simpan <BsSaveFill />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfileDetailInfo;
