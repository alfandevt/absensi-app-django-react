import React from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";

function TableDataDivisi({ divisiList, onDelete, onEdit }) {
  const renderData = () => {
    if (!divisiList || divisiList.length === 0) {
      return (
        <tr>
          <td colSpan="2">
            <h2>Data tidak ditemukan.</h2>
          </td>
        </tr>
      );
    } else {
      return divisiList.map((item) => (
        <tr key={item.id}>
          <td>{item.nama}</td>
          <td className="d-flex justify-content-end">
            <ButtonGroup>
              <Button
                className="d-flex align-items-center"
                onClick={() => onEdit(item.id)}
                variant="warning"
              >
                Edit&nbsp;
                <BsPencilFill />
              </Button>
              <Button
                className="d-flex align-items-center"
                onClick={() => onDelete(item.id)}
                variant="danger"
              >
                Hapus&nbsp;
                <BsTrashFill />
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
          <th colSpan="2">Divisi</th>
        </tr>
      </thead>
      <tbody>{renderData()}</tbody>
    </Table>
  );
}

export default TableDataDivisi;
