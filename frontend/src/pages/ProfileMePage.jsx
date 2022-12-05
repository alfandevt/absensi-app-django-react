import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import ProfileBaseInfo from "../components/ProfileMeComponents/ProfileBaseInfo";
import ProfileDetailInfo from "../components/ProfileMeComponents/ProfileDetailInfo";
import ProfilePhoto from "../components/ProfileMeComponents/ProfilePhoto";
import { fetchMe } from "../actions/userActions";

function ProfileMePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const { profile } = useSelector((state) => state.user);

  return (
    <Container fluid>
      <h1>Profil Saya</h1>
      <hr />
      <Row>
        <Col md="6" xs="12">
          <Row className="mb-4">
            <Col xs="12" className="mb-4">
              <ProfileBaseInfo {...profile} />
            </Col>
            <hr />
            <Col xs="12">
              <ProfilePhoto {...profile} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="mb-4">
            <Col xs="12">
              <ProfileDetailInfo {...profile.profil} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileMePage;
