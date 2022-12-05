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
import { useParams } from "react-router-dom";
import { fetchUser, resetDetail } from "../actions/userListActions";
import Spinner from "../components/Spinner/Spinner";
import { fetchDivisiDetail, resetDetailDivisi } from "../actions/divisiActions";

const monthOptions = getMonthOptions();
const yearOptions = getYearOptions();

function AbsensiDetailPage() {
  const { userId } = useParams();
  const [years, setYears] = useState(currentYears);
  const [months, setMonths] = useState(currentMonths);
  const dispatch = useDispatch();
  const { absensiDetail } = useSelector((state) => state.absensi);
  const { jamKerja } = useSelector((state) => state.jam);
  const { userDetail } = useSelector((state) => state.users);
  const { divisiDetail } = useSelector((state) => state.divisi);

  useEffect(() => {
    dispatch(fetchUser(userId));

    return () => dispatch(resetDetail());
  }, [userId]);

  useEffect(() => {
    if (userDetail) {
      if (userDetail.profil.divisi) {
        dispatch(fetchDivisiDetail(userDetail.profil.divisi));
      }
    }

    return () => dispatch(resetDetailDivisi());
  }, [userDetail]);

  useEffect(() => {
    dispatch(resetAbsensiDetail());
    dispatch(fetchTimes());
    dispatch(fetchAbsensiUser(userId, months, years));

    return () => {
      dispatch(resetAbsensiDetail());
    };
  }, [months, years]);

  console.log(userDetail);

  if (!userDetail) {
    return <Spinner />;
  }

  return (
    <Container fluid>
      <h1>Absen Karyawan</h1>
      <hr />
      <Row className="mb-4">
        <Col xs="8">
          <Row>
            <Col>Nama: {userDetail.nama_lengkap}</Col>
          </Row>
          <Row>
            <Col>
              Divisi: {divisiDetail && <span>{divisiDetail.nama}</span>}
            </Col>
          </Row>
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

export default AbsensiDetailPage;
