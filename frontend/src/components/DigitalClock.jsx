import React from "react";

function DigitalClock({ value, ...props }) {
  const hours =
    value.getHours() < 10 ? `0 ${value.getHours()}` : value.getHours();
  const minutes =
    value.getMinutes() < 10 ? `0 ${value.getMinutes()}` : value.getMinutes();
  const seconds =
    value.getSeconds() < 10 ? `0 ${value.getSeconds()}` : value.getSeconds();
  return (
    <time {...props}>
      {hours} : {minutes} : {seconds}
    </time>
  );
}

export default DigitalClock;
