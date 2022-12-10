import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Image,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import * as APP_URLS from "../constants/urls";

function MobileNavbar() {
  const { profile } = useSelector((state) => state.user);

  let [foto, setFoto] = useState(
    "/static/images/placeholder/Portrait_Placeholder.png"
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
    <Navbar
      collapseOnSelect
      className="d-lg-none"
      expand="lg"
      bg="primary"
      variant="dark"
    >
      <Container fluid>
        <LinkContainer to={APP_URLS.BASE}>
          <Navbar.Brand>Absensi Online</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MobileNavbar;
