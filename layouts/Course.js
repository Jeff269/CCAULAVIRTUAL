import React from "react";
import { useRouter } from "next/router";
// reactstrap components
import { Container } from "reactstrap";
// core components
import CourseNavbar from "components/Navbars/CourseNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import CourseSidebar from "components/Sidebar/CourseSidebar.js";

import routesCourse from "routesCourse.js";

function Course(props) {
  // used for checking current route
  const router = useRouter();
  let mainContentRef = React.createRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);
  const getBrandText = () => {
    for (let i = 0; i < routesCourse.length; i++) {
      if (router.route.indexOf(routesCourse[i].layout + routesCourse[i].path) !== -1) {
        return routesCourse[i].name;
      }
    }
    return "Brand";
  };
  return (
    <>
      <CourseSidebar
        {...props}
        routes={routesCourse}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("assets/img/brand/logo.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <CourseNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
}

export default Course;
