import React from "react";
import { Card } from "react-bootstrap";

function InfoCard({ label, total, variant = "success", textColor = "white" }) {
  return (
    <Card className={`bg-${variant} text-${textColor} text-center`}>
      <Card.Body className="fs-5">{label}</Card.Body>
      <Card.Footer className="fs-2 bg-primary">{total}</Card.Footer>
    </Card>
  );
}

export default InfoCard;
