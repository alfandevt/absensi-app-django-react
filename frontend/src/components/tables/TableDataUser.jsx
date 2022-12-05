import React from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";

function TableDataUser({ users, onDetail }) {
  const renderData = () => {
    if (!users || users.length === 0) {
      return (
        <tr>
          <td colSpan="4">
            <h2>Data tidak ditemukan.</h2>
          </td>
        </tr>
      );
    } else {
      return users.map((user) => (
        <tr key={user.id}>
          <td>{user.profil.nik}</td>
          <td>{user.nama_lengkap}</td>
          <td>{user.email}</td>
          <td>{user.is_staff ? "Admin" : "Karyawan"}</td>
          <td>
            <ButtonGroup>
              <Button
                className="d-flex align-items-center"
                onClick={() => onDetail(user.id)}
              >
                Detil&nbsp;
                <BsInfoCircleFill />
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      ));
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>NIK</th>
          <th>Nama</th>
          <th>Email</th>
          <th colSpan={2}>Level</th>
        </tr>
      </thead>
      <tbody>{renderData()}</tbody>
    </Table>
  );
}

export default TableDataUser;
