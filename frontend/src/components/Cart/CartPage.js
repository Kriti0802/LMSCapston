import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css'; 
function CartPage() {

  const [cartData, setCartData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("calling");
    const fetchCourses = async () => {
      const userMail = JSON.parse(localStorage.getItem('user')).email;
      const response = await fetch('http://lmspwc.eastus.cloudapp.azure.com:5000/courses/getEnrolledCourses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": userMail })
      })
      const data = await response.json();
      setCartData(data);
    }
    fetchCourses();
  },[])
  const handleEnrollNow = () => {
    // Clear the cart data from local storage  
    localStorage.removeItem('cart');
    // Display an alert message  
    alert('Enrolled!');
    // Redirect back to the courses page  
    navigate('/course');
  };

  const handleDeleteCourse = async(courseId) => {
    // Retrieve the cart data from local storage  
    // const cartDataString = localStorage.getItem('cart');
    // const cartDataJson = JSON.parse(cartDataString) || [];

    // // Remove the course at the specified index from the cart data  
    // const updatedCartData = [...cartDataJson];
    // updatedCartData.splice(index, 1);

    // // Update the cart data in local storage  
    // localStorage.setItem('cart', JSON.stringify(updatedCartData));

    // Force a re-render of the component to reflect the updated cart data  
    const userMail = JSON.parse(localStorage.getItem('user')).email;
    const res = await fetch("http://lmspwc.eastus.cloudapp.azure.com:5000/courses/derollCourse",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email":userMail,"courseId": courseId })
    }) 

    window.location.reload();
  };

  // Retrieve the cart data from local storage  
  const cartDataString = localStorage.getItem('cart');
  const cartDataJson = JSON.parse(cartDataString) || [];
  

  return (
    <div>
      <h2>Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log(cartData)}
          {cartData.length>0 && cartData[0].coursesEnroll.map((course, index) => (
            <tr key={index}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>
                <button onClick={() => handleDeleteCourse(cartData[0]._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button onClick={handleEnrollNow}>Enroll Now</button> */}
    </div>
  );
}

export default CartPage;  
