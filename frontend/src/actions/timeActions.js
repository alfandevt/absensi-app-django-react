import axios from "axios";
import {
  TIME_DETAIL_FAIL,
  TIME_DETAIL_REQUEST,
  TIME_DETAIL_SUCCESS,
  TIME_UPDATE_FAIL,
  TIME_UPDATE_REQUEST,
  TIME_UPDATE_SUCCESS,
} from "../constants/timeConstants";
import getCookie from "../utilities/getCookie";
import { swalAlert } from "../utilities/sweetAlert";

export const fetchTimes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TIME_DETAIL_REQUEST });

    const {
      user: { token },
    } = getState();

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const { data } = await axios.get(
      "/api/absensi/manage/setting/jam/",
      config
    );

    dispatch({
      type: TIME_DETAIL_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    dispatch({ type: TIME_DETAIL_FAIL, payload: error.response.status });
    swalAlert("Gagal memuat jam.", { icon: "error" });
  }
};

export const updateTimes = (timeId, formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TIME_UPDATE_REQUEST });

    const {
      user: { token },
    } = getState();
    const csrftoken = getCookie("csrftoken");
    let config = {
      headers: {
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${token}`,
      },
    };
    await axios.patch(
      `/api/absensi/manage/setting/jam/${timeId}/`,
      formData,
      config
    );

    dispatch({ type: TIME_UPDATE_SUCCESS });
    swalAlert("Berhasil menyimpan perubahan.", { icon: "success" });
    dispatch(fetchTimes());
  } catch (error) {
    dispatch({ type: TIME_UPDATE_FAIL, payload: error.response.status });
    swalAlert("Gagal menyimpan perubahan.", { icon: "error" });
  }
};
