import React from "react";
import { Dropdown, Image, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import * as APP_URLS from "../constants/urls";

function Sidebar() {
  return (
    <aside className="d-none d-lg-flex flex-column flex-shrink-0 p-3 bg-primary text-white">
      <Link
        to={APP_URLS.BASE}
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Absensi Online</span>
      </Link>
      <hr />
      <Nav variant="pills" className="flex-column mb-auto">
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
        <Nav.Item>
          <p>Master Data</p>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={APP_URLS.DATA_USER}>
            <Nav.Link>Data User</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={APP_URLS.DATA_DIVISI}>
            <Nav.Link>Data Divisi</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={APP_URLS.DATA_ABSENSI}>
            <Nav.Link>Data Absensi Karyawan</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <hr />
        </Nav.Item>
        <Nav.Item>
          <p>Setting Aplikasi</p>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={APP_URLS.SETTING}>
            <Nav.Link>Setting</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
      <hr />
      <Dropdown>
        <Dropdown.Toggle
          split
          className="d-flex w-100 flex-column align-items-center"
        >
          <Image
            width={32}
            height32
            src="/images/placeholder/Portrait_Placeholder.png"
            roundedCircle
          />
          <strong>User</strong>
        </Dropdown.Toggle>
        <Dropdown.Menu className="text-center w-100">
          <LinkContainer to={APP_URLS.PROFIL}>
            <Dropdown.Item>
              <Button type="button" variant="info" className="w-100">
                Profil
              </Button>
            </Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/logout">
            <Dropdown.Item>
              <Button type="button" variant="danger" className="w-100">
                Logout
              </Button>
            </Dropdown.Item>
          </LinkContainer>
        </Dropdown.Menu>
      </Dropdown>
    </aside>
  );
}

export default Sidebar;
