import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Image, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import * as APP_URLS from "../constants/urls";
import { logout } from "../actions/userActions";
import { useEffect } from "react";

function Sidebar() {
  const { profile } = useSelector((state) => state.user);
  let [foto, setFoto] = useState(
    "/images/placeholder/Portrait_Placeholder.png"
  );
  useEffect(() => {
    if (profile.foto) {
      setFoto(profile.foto);
    }
  }, [profile.foto]);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="d-none d-lg-flex flex-column flex-shrink-0 p-3 bg-primary text-white">
      <Link
        to={APP_URLS.BASE}
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Absensi Online</span>
      </Link>
      <hr />
      <Dropdown>
        <Dropdown.Toggle
          split
          className="d-flex w-100 flex-column align-items-center"
        >
          <Image width="32" height="32" src={foto} roundedCircle />
          <strong>{profile.nama_lengkap}</strong>
        </Dropdown.Toggle>
        <Dropdown.Menu className="text-center w-100">
          <LinkContainer to={APP_URLS.PROFIL}>
            <Dropdown.Item>
              <Button type="button" variant="info" className="w-100">
                Profil
              </Button>
            </Dropdown.Item>
          </LinkContainer>
          <Dropdown.Item>
            <Button
              onClick={handleLogout}
              type="button"
              variant="error"
              className="w-100"
            >
              Logout
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <hr />
      <Nav variant="pills" className="flex-column mb-auto">
        <Nav.Item>
          <p>Menu</p>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={APP_URLS.BASE}>
            <Nav.Link>Beranda</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={APP_URLS.ABSENKU_URL}>
            <Nav.Link>AbsenKu</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <hr />
        </Nav.Item>
        {profile.is_staff && (
          <>
            <Nav.Item>
              <p>Menu Admin</p>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href={APP_URLS.ADMIN_URL}
                target="_blank"
                rel="noreferrer"
              >
                Dashboard Administrasi
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to={APP_URLS.DATA_ABSENSI}>
                <Nav.Link>Absensi</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to={APP_URLS.DATA_USER}>
                <Nav.Link>Karyawan</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to={APP_URLS.DATA_DIVISI}>
                <Nav.Link>Divisi</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to={APP_URLS.SETTING}>
                <Nav.Link>Setting</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </>
        )}
      </Nav>
      <hr />
    </aside>
  );
}

export default Sidebar;
