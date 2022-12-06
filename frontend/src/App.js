import { Container } from "react-bootstrap";
import {  HashRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import * as APP_URLS from "./constants/urls";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import KaryawanPage from "./pages/master-data/KaryawanPage";
import DivisiPage from "./pages/master-data/DivisiPage";
import AuthGuard from "./components/AuthGuard";
import ProfileMePage from "./pages/ProfileMePage";
import SettingPage from "./pages/SettingPage";
import AbsensiPage from "./pages/AbsensiPage";
import UserAbsensiPage from "./pages/UserAbsensiPage";
import AbsensiDetailPage from "./pages/AbsensiDetailPage";

function App() {
  const { profile, token } = useSelector((state) => state.user);

  const renderSidebar = () => {
    if (profile && token) {
      return <Sidebar />;
    }
    return null;
  };

  return (
    <HashRouter>
      <div id="main" className="d-flex flex-nowrap">
        {renderSidebar()}
        <Container fluid id="main-content" className="w-100">
          <Routes>
            <Route
              path={APP_URLS.BASE}
              element={
                <AuthGuard
                  isAllowed={profile && token}
                  redirectPath={APP_URLS.LOGIN_URL}
                  element={<HomePage />}
                />
              }
            />
            <Route
              path={APP_URLS.ABSENKU_URL}
              element={
                <AuthGuard
                  isAllowed={profile && token}
                  redirectPath={APP_URLS.LOGIN_URL}
                  element={<UserAbsensiPage />}
                />
              }
            />
            <Route
              path={`${APP_URLS.ABSEN_DETAIL_URL}/:userId`}
              element={
                <AuthGuard
                  isAllowed={profile && token}
                  redirectPath={APP_URLS.LOGIN_URL}
                  element={<AbsensiDetailPage />}
                />
              }
            />
            <Route
              path={APP_URLS.DATA_ABSENSI}
              element={
                <AuthGuard
                  isAllowed={profile && profile.is_staff && token}
                  redirectPath={APP_URLS.LOGIN_URL}
                  element={<AbsensiPage />}
                />
              }
            />
            <Route
              path={APP_URLS.DATA_USER}
              element={
                <AuthGuard
                  isAllowed={profile && profile.is_staff && token}
                  redirectPath={APP_URLS.LOGIN_URL}
                  element={<KaryawanPage />}
                />
              }
            />
            <Route
              path={APP_URLS.DATA_DIVISI}
              element={
                <AuthGuard
                  isAllowed={profile && profile.is_staff && token}
                  redirectPath={APP_URLS.LOGIN_URL}
                  element={<DivisiPage />}
                />
              }
            />
            <Route
              path={APP_URLS.PROFIL}
              element={
                <AuthGuard
                  isAllowed={profile && token}
                  redirectPath={APP_URLS.LOGIN_URL}
                  element={<ProfileMePage />}
                />
              }
            />
            <Route
              path={APP_URLS.SETTING}
              element={
                <AuthGuard
                  isAllowed={profile && token}
                  redirectPath={APP_URLS.LOGIN_URL}
                  element={<SettingPage />}
                />
              }
            />
            <Route
              path={APP_URLS.LOGIN_URL}
              element={
                <AuthGuard
                  isAllowed={!profile && !token}
                  redirectPath={APP_URLS.BASE}
                  element={<LoginPage />}
                />
              }
            />
          </Routes>
        </Container>
      </div>
    </HashRouter>
  );
}

export default App;
