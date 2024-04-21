import React, { useEffect, useState } from 'react';  
import { useLocation, useNavigate } from "react-router-dom";  
  
import './CoursePage.css';  
  
function CoursePage() {  
  const [courses, setCourses] = useState([]);  
  const [userData, setUserData] = useState({});  
  const [selectedVideo, setSelectedVideo] = useState(null);  
  const navigate = useNavigate();  
  const location = useLocation();  
  
  useEffect(() => {  
    const userDataString = localStorage.getItem('user');  
    const userDataJson = JSON.parse(userDataString);  
    setUserData(userDataJson);  
    fetch('http://lmspwc.eastus.cloudapp.azure.com:5000/courses')  
      .then((response) => response.json())  
      .then((data) => setCourses(data))  
      .catch((error) => console.error(error));  
  }, []);  
  
  const handleAddCourse = () => {  
    navigate('upload');  
  };  
  // called when a video thumbnail is clicked.
  const handleThumbnailClick = (courseId) => {  
    setSelectedVideo(courseId);  
  };  
  
  const openVideoPlayer = (courseId) => {  
    navigate(`/course/video?courseId=${courseId}`);  
  };  
  
  const handleEnroll = async (courseId) => {  
    const userEmail = JSON.parse(localStorage.getItem('user')).email;  
    const res = await fetch('http://lmspwc.eastus.cloudapp.azure.com:5000/courses/enrollment', {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({  
        studentEmail: userEmail,  
        courseId: courseId,  
      }),  
    });  
    console.log(await res.json());  
    const selectedCourse = courses.find((course) => course._id === courseId);  
    const cartDataString = localStorage.getItem('cart');  
    const cartDataJson = JSON.parse(cartDataString) || [];  
    const updatedCartData = [...cartDataJson, selectedCourse];  
    localStorage.setItem('cart', JSON.stringify(updatedCartData));  
    navigate('/cart');  
  };  
  
  const score = location.state?.score;  
  console.log(score);  
  const suggestedCourses = courses.filter((course) => {  
    if (score > 8 && course.difficulty === 'Advanced') {  
      return true;  
    } else if (score > 4 && score <= 8 && course.difficulty === 'Intermediate') {  
      return true;  
    } else if (score <= 4 && course.difficulty === 'Beginner') {  
      return true;  
    }  
    return false;  
  });  
  
  return (  
    <>  
      <div className='h'></div>  
      <div className='container'>  
        {userData && userData.role === 'Trainer' && (  
          <button className="card" onClick={handleAddCourse} style={{paddingInline:"90px"}}>  
            Add course  
          </button>  
        )}  
  
        <div className='suggested-courses'>  
          <h2>Suggested Courses</h2>  
          <div className="card-container">  
            {suggestedCourses.map((course) => (  
              <div className="card" key={course._id}>  
                <div className="card-body">  
                  <img src={`http://lmspwc.eastus.cloudapp.azure.com:5000/courses/courseImage/${course._id}_thumbnail`} alt="image" onClick={() => handleThumbnailClick(course._id)} />  
                  {selectedVideo === course._id && (  
                    <video src={`http://lmspwc.eastus.cloudapp.azure.com:5000/courses/courseVideo/${course._id}_video`} controls style={{ width: '100%', height: 'auto' }} />  
                  )}  
                  <div className="card-body">  
                    <h5 className="card-title">{course.name}</h5>  
                    <p className="card-text">{course.description}</p>  
                    <p className="card-text">Difficulty: {course.difficulty}</p>  
                    <p className="card-text">Trainer: {course.trainer}</p>  
                  </div>  
                  <a href={`http://lmspwc.eastus.cloudapp.azure.com:5000/courses/courseVideo/${course._id}_video`} download className="card-link">Download Video</a>  
                  <button className="card-link" onClick={() => handleEnroll(course._id)} to="/cart" style={{color:'white'}}>Enroll</button>  
                </div>  
              </div>  
            ))}  
          </div>  
        </div>  
  
        <div className='all-courses'>  
          <h2>All Courses</h2>  
          <div className="card-container">  
            {courses.map((course) => (  
              <div className="card" key={course._id}>  
                <div className="card-body">  
                  <img src={`http://lmspwc.eastus.cloudapp.azure.com:5000/courses/courseImage/${course._id}_thumbnail`} alt="image" onClick={() => openVideoPlayer(course._id)} />  
                  <div className="card-body">  
                    <h5 className="card-title">{course.name}</h5>  
                    <p className="card-text">{course.description}</p>  
                    <p className="card-text">Difficulty: {course.difficulty}</p>  
                    <p className="card-text">Trainer: {course.trainer}</p>  
                  </div>  
                  <a href={`http://lmspwc.eastus.cloudapp.azure.com:5000/courses/courseVideo/${course._id}_video`} download className="card-link">Download Video</a>  
                  <button className="card-link" onClick={() => handleEnroll(course._id)} to="/cart" style={{color:'white'}}>Enroll</button>  
                </div>  
              </div>  
            ))}  
          </div>  
        </div>  
      </div>  
    </>  
  );  
}  
  
export default CoursePage;  
