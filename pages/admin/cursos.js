import React, { useEffect, useState }from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";

import axios from 'axios'
import API_URL from "../../config";

const Cursos = () => {
  
  const [ courses, setCourses ] = useState([])
  const [ loading, setLoading ] = useState(true)
  //llamado a la API

  useEffect (() => {
    axios ({
      method: 'GET',
      url: API_URL+'/courses?culminate=false'
    }).then (res =>{
      setCourses(res.data)
      setLoading(false)
      console.log(res)
      }) 
    },[])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className=" mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className=" mb-0">TODOS LOS CURSOS</h3>
              </CardHeader>
              <CardBody>
                {
                  loading ?
                  <p> Cargando... </p>
                  :
                  <div className="row">
                  { courses.map(course => (
                    <Col key={course.id} xl="4">
                      <Card className="shadow">
                        <CardHeader className="bg-transparent">
                          <Row className="align-items-center">
                            <div className="col">
                              <h6 className="text-uppercase text-muted ls-1 mb-1">
                                Diplomado: {course.diplomat.name !== undefined ? course.diplomat.name : ''}
                              </h6>
                              <h3 className="mb-0">{course.name}</h3>
                            </div>
                          </Row>
                        </CardHeader>
                        <CardBody>
                          <img
                            style={{
                              display:'flex',
                              flexFlow: 'column-wrap',
                              width: '100%',
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            src='https://i0.wp.com/admision.utem.cl/wp-content/uploads/2020/11/cual-es-el-trabajo-de-un-ingeniero-comercial.jpg?w=1280&ssl=1' 
                          />
                        </CardBody>
                      </Card>
                    </Col>
                    ))}
                  </div>
                }   
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

Cursos.layout = Admin;

export default Cursos;
