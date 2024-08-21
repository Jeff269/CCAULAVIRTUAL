import React, { useState } from "react";
import axios from 'axios';
import API_URL from "../../config";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";

const Login = () => {
    

  console.log(API_URL)
  const [check, updateCheck] = useState('')

  const [us, saveUs] = useState({
    identifier:'',
    password:''
  });

  const { identifier, password } = us;

  const onChange = e => {
    saveUs({
      ...us,
      [e.target.name] : e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
  }
  const login = () => {
    axios.post(API_URL+'/auth/local', us)
    .then(response => {
      
      // Handle success.
      //console.log('Well done!');
      //console.log('User profile', response.data.user);
      //console.log(response.data)
      //console.log('User token', response.data.jwt);
      localStorage.setItem("token", response.data.jwt)
      location.assign(`/admin/panel`);
      
    })
    .catch(error => {
      // Handle error.
      //console.log('An error occurred:', error.response);
      updateCheck(false)
    });
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2 mb-3">
              <h3>Iniciar Sesión</h3>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={onSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Usuario o Correo electrónico"
                    type="text"
                    id="identifier"
                    name="identifier"
                    value={identifier}
                    onChange={onChange}  
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange} 
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Recordarme</span>
                </label>
              </div>

              { check === false &&
                <div className="text-center">
                  <div className="alert alert-danger my-4" role="alert">
                    Usuario y/o contraseña incorrectas
                  </div>
                </div>
              }
                
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" onClick={login}>
                  Entrar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#ccitec"
              onClick={(e) => e.preventDefault()}
            >
              <small>Contactar con soporte técnico</small>
            </a>
          </Col>
          
        </Row>
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
