import React from "react";
import { Form } from "react-bootstrap";

function AbsenForm() {
  return (
    <Form>
      <Form.Select>
        <option>Masuk</option>
        <option>Sakit</option>
      </Form.Select>
    </Form>
  );
}

export default AbsenForm;
