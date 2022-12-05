import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import {
  convertAbsensiData,
  findAbsen,
  getAllDaysInMonth,
  matchArrayOfDateToDate,
} from "../../utilities/dateHelper";
import ExportButton from "../ExportButton";
import Spinner from "../Spinner/Spinner";

const years = new Date().getFullYear();
const months = new Date().getMonth();
const dateFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function TableAbsen({ absensi, year = years, month = months, jamKerja }) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates(convertAbsensiData(absensi, month, year, jamKerja));
  }, [absensi, month, year, jamKerja]);

  const renderData = () => {
    if (dates.length < 0) {
      return <Spinner />;
    }
    return dates.map((item) => (
      <tr key={item.id}>
        <td>{item.date.toLocaleDateString("id-Id", dateFormatOptions)}</td>
        <td>{item.jamMasuk}</td>
        <td>{item.keterangan}</td>
      </tr>
    ));
  };

  return (
    <>
      <ExportButton tableData={dates} fileName="data-absensi" />
      <Table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Jam Masuk</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </>
  );
}

export default TableAbsen;
