import axios from "axios";
import {
  USER_DEACTIVATE_FAIL,
  USER_DEACTIVATE_REQUEST,
  USER_DEACTIVATE_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_RESET,
  USER_DETAIL_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userListConstants";
import getCookie from "../utilities/getCookie";
import { swalAlert } from "../utilities/sweetAlert";

export const register = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

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

    await axios.post("/api/user/manage/users/", formData, config);

    dispatch({ type: USER_REGISTER_SUCCESS });
    dispatch(fetchUsers());
    swalAlert("Berhasil register akun.", { icon: "success" });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.status });
    swalAlert("Gagal register akun.", { icon: "error" });
  }
};

export const updateUser = (userId, formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

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
      `/api/user/manage/users/${userId}/`,
      formData,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    swalAlert("Berhasil menyimpan perubahan.", { icon: "success" });
    dispatch(fetchUser(userId));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.response.status });
    swalAlert("Gagal menyimpan perubahan.", { icon: "error" });
  }
};

export const deactivateUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DEACTIVATE_REQUEST });

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

    await axios.delete(`/api/user/manage/users/${userId}/`, config);

    dispatch({ type: USER_DEACTIVATE_SUCCESS });
    swalAlert("Berhasil menonaktifkan akun.", { icon: "success" });
    dispatch(fetchUsers());
  } catch (error) {
    dispatch({ type: USER_DEACTIVATE_FAIL, payload: error.response.status });
    swalAlert("Gagal menonaktifkan akun.", { icon: "error" });
  }
};

export const fetchUsers =
  (searchParams = "", page = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });

      const {
        user: { token },
      } = getState();

      const csrftoken = getCookie("csrftoken");
      let config = {
        headers: {
          "X-CSRFToken": csrftoken,
          Authorization: `Token ${token}`,
        },
        params: {
          sq: searchParams,
          pg: page,
        },
      };

      const { data } = await axios.get("/api/user/manage/users/absensi-user", config);

      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_LIST_FAIL, payload: error.response.status });
      swalAlert("Gagal memuat data.");
    }
  };

export const fetchUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAIL_REQUEST });

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
      `/api/user/manage/users/${userId}/`,
      config
    );

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAIL_FAIL, payload: error.response.status });
    swalAlert("Gagal memuat data.");
  }
};

export const resetDetail = () => async (dispatch) => {
  dispatch({ type: USER_DETAIL_RESET });
};

export const uploadFotoUser =
  (userId, formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });


      const {
        user: { token },
      } = getState();
      const csrftoken = getCookie("csrftoken");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrftoken,
          Authorization: `Token ${token}`,
        },
      };

      const { data } = await axios.patch(
        `/api/user/manage/users/${userId}/`,
        formData,
        config
      );

      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      swalAlert("Berhasil upload foto.", { icon: "success" });
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.response.status });
      swalAlert("Gagal upload foto.", { icon: "error" });
    }
  };
