import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Clock from "react-clock";
import useClock from "../hooks/useClock";
import "react-clock/dist/Clock.css";
import DigitalClock from "../components/DigitalClock";
import InfoCard from "../components/InfoCard";

function HomePage() {
  const [time] = useClock();

  return (
    <Container fluid>
      <h1>Beranda</h1>
      <hr />
      <Row>
        <Col className="w-100 d-flex flex-column justify-content-center align-items-center">
          <div className="clock-wrapper p-3 rounded d-flex flex-column justify-content-center align-items-center">
            <Clock value={time} />
            <DigitalClock className="fs-2 mt-2" value={time} />
            <Button variant="success" type="button" className="mt-2 w-100">
              Absen
            </Button>
          </div>
        </Col>
      </Row>
      <hr />
      <h1 className="mb-4">Kehadiran Bulan Ini</h1>
      <Row>
        <Col xs="12" sm="6" md="3" className="mb-2">
          <InfoCard label="Tepat Waktu" total={2} />
        </Col>
        <Col xs="12" sm="6" md="3" className="mb-2">
          <InfoCard label="Terlambat" total={2} variant="danger" />
        </Col>
        <Col xs="12" sm="6" md="3" className="mb-2">
          <InfoCard label="Izin" total={2} variant="info" />
        </Col>
        <Col xs="12" sm="6" md="3" className="mb-2">
          <InfoCard label="Sakit" total={2} variant="warning" />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
