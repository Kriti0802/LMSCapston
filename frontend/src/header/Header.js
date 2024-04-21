import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Upload from '../components/Upload';
import AssessmentPage from '../components/AssessmentPage';
import CoursePage from '../components/CoursePage';
import StudentList from '../components/StudentList';
import Home from '../components/Home';
import { useState } from "react";
import Profile from "../components/Profile/Profile";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import CartPage from '../components/Cart/CartPage';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import WelcomePage from '../components/welcome';
import VideoPlayer from '../components/VideoPlayer';

function HeaderList() {
  const [userData, setUserData] = useState({});

  const handleLogout = () => {
    setUserData({});
    toast("Logged out successfully");
    localStorage.removeItem('user');
  }


  return (

    <Router>
      <Toaster />
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">CloudHunt</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* <Nav.Link as={Link} to="/">Home</Nav.Link>   */}

              {/* <NavDropdown title="Documents" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/AssessmentPage">Assessment Page</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/CoursePage">Course Page</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/StudentList">Student List</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/upload">
                  Upload
                </NavDropdown.Item>
              </NavDropdown> */}
              {userData._id && (
                <>
                  <Nav.Link as={Link} to="/course">Courses</Nav.Link>
                  <Nav.Link as={Link} to="/assesment">Assessments</Nav.Link>
                  {console.log(userData)}
                  {userData.userrole === "Trainer" && <Nav.Link as={Link} to="/student">Students</Nav.Link>}
                </>
              )}
            </Nav>
            <Nav className="ml-auto">
              {!userData._id && (
                <>
                  <Nav.Link as={Link} to="/SignUp">Sign Up</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>

              )}
              {userData._id && (
                <>
                  <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                  <Nav.Link as={Link} to="/profile" >Profile</Nav.Link>
                  <Nav.Link onClick={handleLogout} >Logout</Nav.Link>

                </>

              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentList />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/assesment" element={<AssessmentPage />} />
        <Route path="/course" element={<CoursePage />} >

        </Route>
        <Route path="/course/video/" element={<VideoPlayer />} >

</Route>
        <Route path="/course/upload" element={<Upload />} />
        <Route
          path="/profile"
          element={
            userData && userData._id ? (
              <Profile
                setUserData={setUserData}
                username={userData.fname}
              />
            ) : (
              <Login setUserData={setUserData} />
            )
          }
        />
        <Route
          path="/login"
          element={<Login setUserData={setUserData} />}
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default HeaderList;  
