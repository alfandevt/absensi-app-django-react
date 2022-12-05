import React from "react";

function DateInfo({ value }) {
  const formatDate = () => {
    const formatter = new Intl.DateTimeFormat("id", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatter.format(value);
  };

  return <div>{formatDate(value)}</div>;
}

export default DateInfo;
