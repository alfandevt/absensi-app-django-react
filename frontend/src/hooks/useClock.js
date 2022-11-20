import { useEffect, useState } from "react";

function useClock() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return [value];
}

export default useClock;
