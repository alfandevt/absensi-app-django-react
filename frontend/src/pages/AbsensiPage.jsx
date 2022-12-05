import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Paginator from "../components/Paginator";
import { fetchUsers } from "../actions/userListActions";
import Spinner from "../components/Spinner/Spinner";
import TableUserAbsensi from "../components/tables/TableUserAbsensi";
import { ABSEN_DETAIL_URL } from "../constants/urls";

function AbsensiPage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [pageParam] = useSearchParams();
  const [debounceParam, setDebounceParam] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowDetailForm = (userid) => {
    navigate(`${ABSEN_DETAIL_URL}/${userid}`);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      const searchQuery = searchParam.get("sq");
      setDebounceParam(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchParam]);

  useEffect(() => {
    const pageNumber = pageParam.get("pg");
    dispatch(fetchUsers(debounceParam, pageNumber));
  }, [dispatch, debounceParam, pageParam]);

  const { userList, userDetail } = useSelector((state) => state.users);

  const handleSearch = (event) => {
    const sq = event.target.value.toLowerCase();
    setSearchParam({ sq });
  };

  return (
    <Container fluid>
      {!userList ? <Spinner /> : null}
      <h1>Absensi Karyawan</h1>
      <hr />
      <Row className="mb-4">
        <Col xs="4">
          <span className="sr-only"></span>
        </Col>
        <Col xs="4" className="sr-only"></Col>
        <Col xs="4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari karyawan (NIK, Nama, Email)"
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="12">
          {userList !== undefined ? (
            <TableUserAbsensi
              users={userList.results}
              onDetail={handleShowDetailForm}
            />
          ) : (
            <TableUserAbsensi users={[]} />
          )}
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="d-flex flex-nowrap justify-content-end">
          <Paginator pageData={userList} />
        </Col>
      </Row>
    </Container>
  );
}

export default AbsensiPage;
