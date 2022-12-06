import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Clock from "react-clock";
import useClock from "../hooks/useClock";
import "react-clock/dist/Clock.css";
import DigitalClock from "../components/DigitalClock";
import InfoCard from "../components/InfoCard";
import DateInfo from "../components/DateInfo";
import Spinner from "../components/Spinner/Spinner";
import {
  absensiCount,
  checkUserAbsenToday,
  createAbsen,
} from "../actions/absensiActions";
import { fetchTimes } from "../actions/timeActions";

function HomePage() {
  const [time] = useClock();
  const dispatch = useDispatch();
  const [dayNow, ] = useState(new Date().getDay());

  const { absen, absenCount, hasAbsen } = useSelector((state) => state.absensi);
  const { jamKerja } = useSelector((state) => state.jam);

  useEffect(() => {
    dispatch(fetchTimes());
    dispatch(absensiCount());
  }, []);

  useEffect(() => {
    dispatch(checkUserAbsenToday());
  }, [jamKerja, absen]);

  const handleAbsenMasuk = () => {
    dispatch(createAbsen({ keterangan: "M" }));
  };

  if (absenCount === undefined) {
    return <Spinner />;
  }

  const renderButtonAbsen = () => {
    if (hasAbsen) {
      return <Form.Text>Sudah Absen</Form.Text>;
    } else if (dayNow === 6 || dayNow === 0) {
      return <Form.Text>Hari Libur</Form.Text>;
    }

    return (
      <Button
        onClick={handleAbsenMasuk}
        variant="success"
        type="button"
        className="mt-2 w-100"
      >
        Absen Masuk
      </Button>
    );
  };

  return (
    <Container fluid>
      <h1>Beranda</h1>
      <hr />
      <Row>
        <Col
          md="6"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="clock-wrapper p-3 rounded d-flex flex-column justify-content-center align-items-center">
            <Clock value={time} />
            <DigitalClock className="fs-2 mt-2" value={time} />
            <DateInfo value={time} />
          </div>
          <Form>{renderButtonAbsen()}</Form>
        </Col>
        <Col md="6">
          <h1 className="mb-4">Kehadiran Bulan Ini</h1>
          <Row>
            <Col xs="12" sm="6" md="6" className="mb-2">
              <InfoCard label="Tepat Waktu" total={absenCount.tepat} />
            </Col>
            <Col xs="12" sm="6" md="6" className="mb-2">
              <InfoCard
                label="Terlambat"
                total={absenCount.telat}
                variant="danger"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
