import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
 
const WelcomePage = () => {
const [courses, setCourses] = useState([]);
 
useEffect(() => {
fetch('http://localhost:5000/courses')
.then(response => response.json())
.then(data => setCourses(data))
.catch(error => console.error(error));
}, []);
 
return (
<div className="welcome-container">
<h1>Welcome to CloudHunt !!</h1>
<p>Take up this small assessment and get your suggested courses</p>
<Link to="/assesment" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px', textDecoration:'none'  }}>  
  <button style={{ margin: '10px'}}>Take Assessment</button>  
</Link>
<Link to="/course">
  <Carousel>    
    {courses.map((course, index) => (    
      <Carousel.Item key={index}>    
        <img className="d-block w-100" src={`http://localhost:5000/courses/courseImage/${course._id}_thumbnail`} alt={`Slide ${index + 1}`} />    
        <Carousel.Caption>    
          <h5>{course.name}</h5>    
          <p>{course.description}</p>      
        </Carousel.Caption>    
      </Carousel.Item>    
    ))}    
  </Carousel>  
</Link>
</div>  
);
};
 
export default WelcomePage;
 