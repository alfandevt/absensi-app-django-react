import axios from "axios";
import {
  DIVISI_CREATE_FAIL,
  DIVISI_CREATE_REQUEST,
  DIVISI_CREATE_SUCCESS,
  DIVISI_DELETE_FAIL,
  DIVISI_DELETE_REQUEST,
  DIVISI_DELETE_SUCCESS,
  DIVISI_DETAIL_FAIL,
  DIVISI_DETAIL_REQUEST,
  DIVISI_DETAIL_RESET,
  DIVISI_DETAIL_SUCCESS,
  DIVISI_LIST_FAIL,
  DIVISI_LIST_REQUEST,
  DIVISI_LIST_SUCCESS,
  DIVISI_UPDATE_FAIL,
  DIVISI_UPDATE_REQUEST,
  DIVISI_UPDATE_SUCCESS,
} from "../constants/divisiConstants";
import getCookie from "../utilities/getCookie";
import { swalAlert } from "../utilities/sweetAlert";

export const createDivisi = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIVISI_CREATE_REQUEST });

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

    await axios.post("/api/user/manage/divisi/", formData, config);
    dispatch({ type: DIVISI_CREATE_SUCCESS });
    dispatch(fetchDivisi());
    swalAlert("Berhasil membuat divisi.", { icon: "success" });
  } catch (error) {
    dispatch({ type: DIVISI_CREATE_FAIL, payload: error.response.status });
  }
};

export const updateDivisi =
  (divisiId, formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: DIVISI_UPDATE_REQUEST });

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

      const { data } = await axios.patch(
        `/api/user/manage/divisi/${divisiId}/`,
        formData,
        config
      );

      dispatch({ type: DIVISI_UPDATE_SUCCESS, payload: data });
      swalAlert("Berhasil menyimpan perubahan.", { icon: "success" });
      dispatch(fetchDivisi());
    } catch (error) {
      dispatch({ type: DIVISI_UPDATE_FAIL, payload: error.response.status });
      swalAlert("Gagal menyimpan perubahan.", { icon: "error" });
    }
  };

export const deleteDivisi = (divisiId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIVISI_DELETE_REQUEST });

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
    await axios.delete(`/api/user/manage/divisi/${divisiId}/`, config);
    dispatch({ type: DIVISI_DELETE_SUCCESS });
    swalAlert("Berhasil menghapus divisi.", { icon: "success" });
    dispatch(fetchDivisi());
  } catch (error) {
    dispatch({ type: DIVISI_DELETE_FAIL, payload: error.response.status });
    swalAlert("Gagal menghapus divisi.", { icon: "error" });
  }
};

export const fetchDivisi =
  (searchParams = "", page = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: DIVISI_LIST_REQUEST });

      const {
        user: { token },
      } = getState();

      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          sq: searchParams,
          pg: page,
        },
      };
      const { data: list } = await axios.get("/api/user/manage/divisi", config);

      dispatch({
        type: DIVISI_LIST_SUCCESS,
        payload: list,
      });
    } catch (error) {
      dispatch({ type: DIVISI_LIST_FAIL, payload: error.response.status });
      swalAlert("Gagal memuat divisi.", { icon: "error" });
    }
  };

export const fetchDivisiDetail = (divisiId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIVISI_DETAIL_REQUEST });

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

    const { data } = await axios.get(
      `/api/user/manage/divisi/${divisiId}/`,
      config
    );

    dispatch({ type: DIVISI_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DIVISI_DETAIL_FAIL, payload: error.response.status });
    swalAlert("Gagal memuat data.");
  }
};

export const resetDetailDivisi = () => async (dispatch) => {
  dispatch({ type: DIVISI_DETAIL_RESET });
};
