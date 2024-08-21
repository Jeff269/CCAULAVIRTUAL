import React from "react";
import Link from "next/link";
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container,
  
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <span>
              <NavbarBrand href="https://www.cursosccitec.com">
                <img
                  alt="logo CCITEC"
                  src={require("assets/img/theme/logo.png")}
                />
              </NavbarBrand>
            </span>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
