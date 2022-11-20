import { useState } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

function createWrapperBody(wrapperId) {
  const wrapperEl = document.createElement("div");
  wrapperEl.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperEl);
  return wrapperEl;
}

function Portal({ children, wrapperId = "modals" }) {
  const [wrapperEl, setWrapperEl] = useState(null);

  useEffect(() => {
    let el = document.getElementById(wrapperId);
    let isCreateEl = false;

    if (!el) {
      isCreateEl = true;
      el = createWrapperBody(wrapperId);
    }
    setWrapperEl(el);

    return () => {
      if (isCreateEl && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, [wrapperId]);

  if (wrapperEl === null) {
    return null;
  }

  return createPortal(children, wrapperEl);
}

export default Portal;
