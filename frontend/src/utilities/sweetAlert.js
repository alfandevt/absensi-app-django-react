import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

export const swalAlert = (message, options = {}) => {
  mySwal.fire({
    timer: 2000,
    titleText: message,
    confirmButtonColor: "#0f79d5",
    ...options,
  });
};

export const swalConfirm = (cb, options = {}) => {
  mySwal.fire({
    showCancelButton: true,
    confirmButtonColor: "#0f79d5",
    cancelButtonColor: "#ea4a4a",
    ...options,
  }).then((result) => {
    if (result.isConfirmed) {
      cb();
    }
  });
};

export default mySwal;
