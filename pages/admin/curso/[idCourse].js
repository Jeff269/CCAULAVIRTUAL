import React, { useState, useEffect  }from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import ReactPlayer from 'react-player';

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
import Course from "layouts/Course.js";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

import { useRouter } from 'next/router'

import axios from 'axios'

import Authentication from 'components/help/authentication.js'
import API_URL from "../../../config";

const CourseItem = () => {
  const router = useRouter()
  const idCourse =  router.query.idCourse 

  const [ resources, setResources ] = useState([])

  const [ course, setCourse ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect (() => {
    axios ({
      method: 'GET',
      url: API_URL+`/courses/`+idCourse
    }).then (res =>{
      setCourse(res.data)
      setLoading(false)
      }) 
  },[])

  useEffect (() => {
    axios ({
      method: 'GET',
      url: API_URL+`/resources?_limit=1000000`
    }).then (res =>{
      setResources(res.data)
      //setLoading(false)
      }) 
  },[])
  
const sections = course.sections

//console.log(course.sections)

  return(
    <>
      <Header />
      {/* Page content */}
      <Container className=" mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className=" mb-0">{course.name}</h3>
              </CardHeader>
              <CardBody>
                {
                  loading ?
                  <p> Cargando... </p>
                  :
                  <div className="row">
                  { sections.map(section => (
                    <Col key={section.id} xl="12">
                      <Card className="shadow">
                        <CardHeader className="bg-transparent">
                          <Row className="align-items-center">
                            <div className="col">
                              <h6 className="text-uppercase text-muted ls-1 mb-1">
                               {section.name}
                              </h6>
                              <h3 className="mb-0">{section.description}</h3>
                            </div>
                          </Row>
                        </CardHeader>
                      </Card>

                      { resources.filter(resource => section.id === resource.section._id).map(resource => 
                        { switch (resource.type) {
                            case "url":
                              return(
                                <a href={resource.description}>
                                  <Row className="align-items-center" style={{ paddingLeft: '50px'}}>
                                    <div className="col">
                                      <Row className="align-items-center" style={{ padding:'10px'}}>
                                        <i className='ni ni-world' style={{ color: '#11AEEF', padding: '5px'}} />
                                        <h3 className="mb-0 text"> 
                                            {resource.name}   
                                        </h3>
                                        <style jsx>{`
                                          .text {
                                            color: #11AEEF
                                          }
                                          h3:hover{
                                            color: #118BEF;
                                            text-decoration: underline #118BEF
                                          }
                                            `
                                        }</style>
                                      </Row>
                                    </div>
                                  </Row>
                                </a>
                              )
                            case "text":
                              return(
                                <Row className="align-items-center" style={{ paddingLeft: '50px'}}>
                                  <div className="col">
                                    <Row className="align-items-center" style={{ padding:'10px'}}>
                                      <h3 className="mb-0 text"> 
                                          {resource.name}   
                                      </h3>
                                    </Row>
                                    <Row className="align-items-center">
                                      <p className="mb-0 text"> 
                                            {resource.description}   
                                      </p>
                                    </Row>
                                  </div>
                                </Row>
                                
                              )
                              case "photo":
                                return(
                                  <Row className="align-items-center" style={{ paddingLeft: '50px'}}>
                                    <div className="col">
                                      <Row className="align-items-center" style={{ padding:'10px'}}>
                                        <h3 className="mb-0 text"> 
                                            {resource.name}   
                                        </h3>
                                      </Row>
                                      <Row className="align-items-center">
                                        <img
                                          style={{
                                            display:'flex',
                                            flexFlow: 'column-wrap',
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingBottom: '10px'
                                          }}
                                          alt={resource.photo.name}
                                          src={`${resource.photo.url}`}
                                        />
                                      </Row>
                                    </div>
                                  </Row>
                                )
                                case "video":
                                  return(
                                    <Row className="align-items-center" style={{ paddingLeft: '50px'}}>
                                      <div className="col">
                                        <Row className="align-items-center" style={{ padding:'10px'}}>
                                          <h3 className="mb-0 text"> 
                                              {resource.name}   
                                          </h3>
                                        </Row>
                                        <Row className="align-items-center">
                                          
                                        <iframe src={resource.description} loading="lazy" width="100%" height="720" allowfullscreen="true"></iframe>
                                        </Row>
                                      </div>
                                    </Row>
                                  )
                            default:
                              
                          }
                        }
                      )}
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
  )

}

CourseItem.layout = Course

export default CourseItem