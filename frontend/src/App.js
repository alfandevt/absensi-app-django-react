import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import * as APP_URLS from "./constants/urls";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DataUserPage from "./pages/master-data/DataUserPage";

function App() {
  return (
    <BrowserRouter>
      <div id="main" className="d-flex flex-nowrap">
        <Sidebar />
        <Container fluid id="main-content" className="w-100">
          <Routes>
            <Route path={APP_URLS.BASE} element={<HomePage />} />
            <Route path={APP_URLS.LOGIN_URL} element={<LoginPage />} />
            <Route path={APP_URLS.DATA_USER} element={<DataUserPage />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
