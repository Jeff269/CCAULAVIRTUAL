import React, { useEffect, useState } from "react";
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

import axios from 'axios'
import API_URL from "../../config";

const Dashboard = () => {

  const [ courses, setCourses ] = useState([])
  const [ loading, setLoading ] = useState(true)
  //llamado a la API

  useEffect (() => {
    axios ({
      method: 'GET',
      url: API_URL+'/courses?_limit=1000000'
    }).then (res =>{
      setCourses(res.data)
      setLoading(false)
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
                <h3 className=" mb-0">LO ÚLTIMO DE CCITEC</h3>
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
                                Diplomado: {course.diplomat.name}
                              </h6>
                              <h3 className="mb-0">{course.name}</h3>
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
                            alt={course.photo.name}
                            className=""
                            src={`${course.photo.url}`}
                          /> */}
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


Dashboard.layout = Admin;

export default Dashboard;
