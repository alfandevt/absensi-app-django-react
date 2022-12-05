import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import AddUserForm from "../../components/modals/forms/AddUserForm";
import Paginator from "../../components/Paginator";
import TableDataUser from "../../components/tables/TableDataUser";
import { useEffect } from "react";
import {
  fetchUser,
  fetchUsers,
  register,
  resetDetail,
} from "../../actions/userListActions";
import DetailUserForm from "../../components/modals/forms/DetailUserForm";
import Spinner from "../../components/Spinner/Spinner";

function KaryawanPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const handleShowAddForm = () => setShowAddForm(true);
  const handleHideAddForm = () => setShowAddForm(false);

  const [showDetailForm, setShowDetailForm] = useState(false);
  const handleShowDetailForm = (userId) => {
    dispatch(fetchUser(userId));
    setShowDetailForm(true);
  };
  const handleHideDetailForm = () => {
    dispatch(resetDetail());
    dispatch(fetchUsers());
    setShowDetailForm(false);
  };

  const [searchParam, setSearchParam] = useSearchParams();
  const [pageParam] = useSearchParams();
  const [debounceParam, setDebounceParam] = useState("");

  const dispatch = useDispatch();

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

  const handleSave = (formData) => {
    dispatch(register(formData));
  };

  const handleSearch = (event) => {
    const sq = event.target.value.toLowerCase();
    setSearchParam({ sq });
  };

  return (
    <Container fluid>
      {!userList ? <Spinner /> : null}
      <h1>Karyawan</h1>
      <hr />
      <Row className="mb-4">
        <Col xs="4">
          <Button onClick={handleShowAddForm}>Tambah</Button>
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
            <TableDataUser
              users={userList.results}
              onDetail={handleShowDetailForm}
            />
          ) : (
            <TableDataUser users={[]} onDetail={handleShowDetailForm} />
          )}
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="d-flex flex-nowrap justify-content-end">
          <Paginator pageData={userList} />
        </Col>
      </Row>
      <AddUserForm
        show={showAddForm}
        onHandleHide={handleHideAddForm}
        onSave={handleSave}
      />
      <DetailUserForm
        show={showDetailForm}
        onHandleHide={handleHideDetailForm}
        detail={userDetail}
      />
    </Container>
  );
}

export default KaryawanPage;
