import axios from "axios";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_ME_FAIL,
  USER_ME_SUCCESS,
  USER_UPDATE_ME_PROFILE_REQUEST,
  USER_ME_REQUEST,
  USER_UPDATE_ME_PROFILE_SUCCESS,
  USER_UPDATE_ME_PROFILE_FAIL,
} from "../constants/userConstants";
import getCookie from "../utilities/getCookie";
import { swalAlert } from "../utilities/sweetAlert";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const csrftoken = getCookie("csrftoken");
    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    };

    const { data } = await axios.post(
      "/api/user/token/",
      { email, password },
      config
    );

    config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    };

    const { data: user } = await axios.get("/api/user/me/", {
      headers: {
        Authorization: `Token ${data.token}`,
      },
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { token: data.token, user },
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(user));
    swalAlert("Berhasil login.", { icon: "success" });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.status });
    swalAlert("Kata sandi atau email salah.", { icon: "error" });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch({ type: USER_LOGOUT });
};

export const fetchMe = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ME_REQUEST });

    const {
      user: { token },
    } = getState();

    const { data: user } = await axios.get("/api/user/me/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    dispatch({
      type: USER_ME_SUCCESS,
      payload: user,
    });
    localStorage.setItem("user", JSON.stringify(user));
    swalAlert("Berhasil memuat detail user.", { icon: "success" });
  } catch (error) {
    dispatch({ type: USER_ME_FAIL, payload: error.response.status });
    dispatch({ type: USER_LOGOUT });
    swalAlert("Gagal memuat detail user.", { icon: "error" });
  }
};

export const updateMe = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_ME_PROFILE_REQUEST });

    const {
      user: { token },
    } = getState();
    const csrftoken = getCookie("csrftoken");
    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${token}`,
      },
    };

    const { data } = await axios.patch("/api/user/me/", userData, config);

    dispatch({ type: USER_UPDATE_ME_PROFILE_SUCCESS, payload: data });
    swalAlert("Berhasil update profil.", { icon: "success" });
  } catch (error) {
    dispatch({ type: USER_UPDATE_ME_PROFILE_FAIL, payload: error.response.status });
    swalAlert("Gagal update profil.", { icon: "error" });
  }
};

export const uploadFoto = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_ME_PROFILE_REQUEST });
    console.log(formData);

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

    const { data } = await axios.patch("/api/user/me/", formData, config);

    dispatch({ type: USER_UPDATE_ME_PROFILE_SUCCESS, payload: data });
    swalAlert("Berhasil upload foto.", { icon: "success" });
  } catch (error) {
    dispatch({ type: USER_UPDATE_ME_PROFILE_FAIL, payload: error.response.status });
    swalAlert("Gagal upload foto.", { icon: "error" });
  }
};
