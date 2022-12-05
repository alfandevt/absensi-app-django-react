import axios from "axios";
import {
  ABSENSI_COUNT_FAIL,
  ABSENSI_COUNT_SUCCESS,
  ABSENSI_CREATE_FAIL,
  ABSENSI_CREATE_REQUEST,
  ABSENSI_CREATE_SUCCESS,
  ABSENSI_DETAIL_FAIL,
  ABSENSI_DETAIL_REQUEST,
  ABSENSI_DETAIL_RESET,
  ABSENSI_DETAIL_SUCCESS,
} from "../constants/absensiConstants";
import getCookie from "../utilities/getCookie";
import { swalAlert } from "../utilities/sweetAlert";

export const createAbsen = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ABSENSI_CREATE_REQUEST });

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

    const { data } = await axios.post("/api/absensi/absen/", formData, config);
    dispatch({ type: ABSENSI_CREATE_SUCCESS, payload: data });
    localStorage.setItem("absen", JSON.stringify(data));
  } catch (error) {
    const errorMessage = error.response.data.detail;
    dispatch({ type: ABSENSI_CREATE_FAIL, payload: error.response.status });
    swalAlert(errorMessage, { icon: "error" });
  }
};

export const absensiCount = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ABSENSI_CREATE_REQUEST });

    const {
      user: {
        token,
        profile: { id },
      },
    } = getState();
    const csrftoken = getCookie("csrftoken");
    let config = {
      headers: {
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${token}`,
      },
    };

    const { data } = await axios.get(`/api/absensi/absen-info/${id}/`, config);
    dispatch({ type: ABSENSI_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ABSENSI_COUNT_FAIL, payload: error.response.status });
  }
};

export const fetchAbsensiUser =
  (userId, month, year) => async (dispatch, getState) => {
    try {
      dispatch({ type: ABSENSI_DETAIL_REQUEST });

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

      const { data } = await axios.post(
        `/api/absensi/list-absen/${userId}/`,
        { month: Number(month) + 1, year: Number(year) },
        config
      );
      const formatedData = data.results.map((item) => ({
        ...item,
        jam: new Date(item.jam),
      }));
      dispatch({ type: ABSENSI_DETAIL_SUCCESS, payload: formatedData });
    } catch (error) {
      dispatch({ type: ABSENSI_DETAIL_FAIL, payload: error.response.status });
    }
  };

export const resetAbsensiDetail = () => async (dispatch) => {
  dispatch({ type: ABSENSI_DETAIL_RESET });
};
