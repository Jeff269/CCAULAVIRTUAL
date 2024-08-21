import React, { useState, useEffect  }from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

import Link from 'next/link'

import axios from 'axios'

import Authentication from 'components/help/authentication.js'
import API_URL from "../../config";

const MCursos = () => {

  const authentication = Authentication()

  const [ courses, setCourses ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ userAuth, setUserAuth ] = useState()

  useEffect (() => {
    if(authentication.param.id){
      axios ({
        method: 'GET',
        url:API_URL+`/user-courses?users_permissions_user._id=${authentication.param.id}`
      }).then (res =>{
        setCourses(res.data)
        setLoading(false)
      }) 
    }
  },[userAuth])

  setTimeout(() => {
    setUserAuth(authentication.param.id)
  },1);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className=" mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className=" mb-0">MIS CURSOS</h3>
              </CardHeader>
              <CardBody>
                {
                  loading ?
                  <p> Cargando... </p>
                  :
                  <div className="row">
                  { //courses.filter(course => authentication.param.id === course.users_permissions_user.id).map(course => 
                    courses.map(course => 
                    <Col key={course.id} xl="4">                      
                      <Link href={`/admin/curso/${course.course.id}`}>
                        <a href="#ccitec">
                          <Card className="shadow">
                            <CardHeader className="bg-transparent">
                              <Row className="align-items-center">
                                <div className="col">
                                  <h3 className="mb-0">{course.course.name}</h3>
                                </div>
                              </Row>
                            </CardHeader>
                            <CardBody>
                              {/* <img
                                style={{
                                  display:'flex',
                                  flexFlow: 'column-wrap',
                                  width: '100%',
                                  height: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  
                                }}
                                alt={course.course.photo.name}
                                className=""
                                src={`${course.course.photo.url}`}
                              /> */}
                            </CardBody>
                            
                          </Card>
                        </a>
                      </Link>
                    </Col>   
                    )}
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

MCursos.layout = Admin;

export default MCursos;
