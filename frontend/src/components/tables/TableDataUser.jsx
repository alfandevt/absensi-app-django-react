import React from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { genUserData } from "../../constants/local-user-data";
import { BsPencil, BsTrash, BsInfoCircleFill } from "react-icons/bs";

function TableDataUser() {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Email</th>
          <th colSpan={2}>Level</th>
        </tr>
      </thead>
      <tbody>
        {genUserData().map((user) => (
          <tr>
            <td>{user.nik}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <ButtonGroup>
                <Button>
                  <BsInfoCircleFill />
                </Button>
                <Button>
                  <BsPencil />
                </Button>
                <Button>
                  <BsTrash />
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableDataUser;
