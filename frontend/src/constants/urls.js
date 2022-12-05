export const BASE = "/";
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const ABSENKU_URL = "/absenku";
export const PROFIL = "/user/profil";
export const ABSEN_DETAIL_URL = "/absen/detail";

export const DATA_USER = "/data/user";
export const DATA_DIVISI = "/data/divisi";
export const DATA_ABSENSI = "/data/absensi";
export const SETTING = "/setting";
export const ADMIN_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/admin/"
    : "/admin/";
