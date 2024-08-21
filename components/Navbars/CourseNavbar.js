import React from "react";
import Link from "next/link";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import Button from "reactstrap/lib/Button";

import Authentication from 'components/help/authentication.js'

const CourseNavbar = () => {

  const authentication = Authentication()

  const logout = () => {
      console.log("eliminar")
      localStorage.removeItem("token")
      location.assign(`/`);
    }

    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link href="/admin/panel">
              <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
                
              </a>
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/logo.png")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                          {authentication.param.name}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Bienvenido!</h6>
                  </DropdownItem>
                  {/*
                  <Link href="/admin/profile">
                    <DropdownItem>
                      <i className="ni ni-single-02" />
                      <span>Mi Perfil</span>
                    </DropdownItem>
                  </Link>
                  <Link href="/admin/profile">
                    <DropdownItem>
                      <i className="ni ni-settings-gear-65" />
                      <span>Configuración</span>
                    </DropdownItem>
                  </Link>
                  <Link href="/admin/profile">
                    <DropdownItem>
                      <i className="ni ni-calendar-grid-58" />
                      <span>Mi Actividad</span>
                    </DropdownItem>
                  </Link>
                  */}
                  <Link href="https://api.whatsapp.com/send?phone=51981135334" >
                    <a target="_blank">
                      <DropdownItem>
                        <i className="ni ni-support-16" />
                        <span>Soporte Técnico</span>
                      </DropdownItem>
                    </a>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem
                    href="#ccitec"
                    onClick={logout}
                  >
                    <i className="ni ni-user-run" />
                    <span>Salir</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
}

export default CourseNavbar;
