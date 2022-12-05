import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, Row } from "react-bootstrap";
import TableAbsen from "../components/tables/TableAbsen";
import {
  getMonthOptions,
  currentMonths,
  currentYears,
  getYearOptions,
} from "../utilities/dateHelper";
import {
  fetchAbsensiUser,
  resetAbsensiDetail,
} from "../actions/absensiActions";
import { fetchTimes } from "../actions/timeActions";

const monthOptions = getMonthOptions();
const yearOptions = getYearOptions();

function UserAbsensiPage() {
  const [years, setYears] = useState(currentYears);
  const [months, setMonths] = useState(currentMonths);
  const dispatch = useDispatch();
  const { absensiDetail } = useSelector((state) => state.absensi);
  const { profile } = useSelector((state) => state.user);
  const { jamKerja } = useSelector((state) => state.jam);

  useEffect(() => {
    dispatch(resetAbsensiDetail());
    dispatch(fetchTimes());
    dispatch(fetchAbsensiUser(profile.id, months, years));
  }, [months, years]);

  return (
    <Container fluid>
      <h1>AbsensiKu</h1>
      <hr />
      <Row className="mb-4">
        <Col xs="8">
          <span className="sr-only"></span>
        </Col>
        <Col xs="2">
          <Form.Select
            defaultValue={currentMonths}
            onChange={(e) => setMonths(e.target.value)}
          >
            {monthOptions.map((item) => (
              <option key={item.getMonth()} value={item.getMonth()}>
                {item.toLocaleDateString("id-Id", { month: "long" })}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs="2">
          <Form.Select
            defaultValue={currentYears}
            onChange={(e) => setYears(e.target.value)}
          >
            {yearOptions.map((item) => (
              <option key={item.getFullYear()} value={item.getFullYear()}>
                {item.getFullYear()}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <hr />
      <Row className="mb-4">
        <Col xs="12">
          <TableAbsen
            absensi={absensiDetail}
            month={Number(months)}
            year={Number(years)}
            jamKerja={jamKerja}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default UserAbsensiPage;
