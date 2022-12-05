import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Paginator from "../../components/Paginator";
import TableDataDivisi from "../../components/tables/TableDataDivisi";
import {
  createDivisi,
  deleteDivisi,
  fetchDivisi,
  fetchDivisiDetail,
  resetDetailDivisi,
  updateDivisi,
} from "../../actions/divisiActions";
import AddDivisiForm from "../../components/modals/forms/AddDivisiForm";
import { swalConfirm } from "../../utilities/sweetAlert";
import EditDivisiForm from "../../components/modals/forms/EditDivisiForm";

function DivisiPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const handleShowAddForm = () => setShowAddForm(true);
  const handleHideAddForm = () => setShowAddForm(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const handleShowEditForm = (divisiId) => {
    dispatch(fetchDivisiDetail(divisiId));
    setShowEditForm(true);
  };
  const handleHideEditForm = () => {
    dispatch(resetDetailDivisi());
    setShowEditForm(false);
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
    dispatch(fetchDivisi(debounceParam, pageNumber));
  }, [dispatch, debounceParam, pageParam]);

  const { divisiList, divisiDetail } = useSelector((state) => state.divisi);

  const handleSearch = (event) => {
    const sq = event.target.value.toLowerCase();
    setSearchParam({ sq });
  };

  const handleCreate = (formData) => {
    dispatch(createDivisi(formData));
  };

  const handleEdit = (divisiId, formData) => {
    dispatch(updateDivisi(divisiId, formData));
  };

  const handleDelete = (divisiId) => {
    const handleConfirm = () => {
      dispatch(deleteDivisi(divisiId));
    };
    swalConfirm(handleConfirm, {
      titleText: "Apakah yakin ingin menghapus divisi?",
    });
  };

  return (
    <Container fluid>
      <h1>Divisi</h1>
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
              placeholder="Cari divisi..."
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="12">
          {divisiList !== undefined ? (
            <TableDataDivisi
              divisiList={divisiList}
              onDelete={handleDelete}
              onEdit={handleShowEditForm}
            />
          ) : (
            <TableDataDivisi
              divisiList={[]}
              onDelete={handleDelete}
              onEdit={handleShowEditForm}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="d-flex flex-nowrap justify-content-end">
          <Paginator />
        </Col>
      </Row>
      <AddDivisiForm
        onSave={handleCreate}
        show={showAddForm}
        onHandleHide={handleHideAddForm}
      />
      <EditDivisiForm
        onSave={handleEdit}
        show={showEditForm}
        onHandleHide={handleHideEditForm}
        detail={divisiDetail}
      />
    </Container>
  );
}

export default DivisiPage;
