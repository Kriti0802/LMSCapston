import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import './StudentList.css';  
  
const StudentList = () => {  
  const [students, setStudents] = useState([]);  
  const [fname, setFname] = useState('');  
  const [lname, setLname] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [selectedStudentId, setSelectedStudentId] = useState('');  
  const [userData, setUserData] = useState({}); // New userData state  
  
  useEffect(() => {  
    fetchStudents();  
    setUserData(JSON.parse(localStorage.getItem('user'))); // Set userData from localStorage  
  }, []);  
  
  const fetchStudents = () => {  
    axios.get('http://lmspwc.eastus.cloudapp.azure.com:5000/students')  
      .then((response) => {  
        setStudents(response.data);  
      })  
      .catch((error) => {  
        console.log(error);  
      });  
  };  
  
  const handleCreateOrUpdate = (id1, _id) => {  
    const existingStudent = students.find((student) => student.id === id1);  
  
    if (existingStudent) {  
      const updatedStudent = {  
        fname: fname,  
        lname: lname,  
        email: email,  
        password: password,  
        id: _id,  
      };  
  
      axios.put(`http://lmspwc.eastus.cloudapp.azure.com:5000/students/update/${_id}`, updatedStudent)  
        .then(() => {  
          fetchStudents();  
          setFname('');  
          setLname('');  
          setEmail('');  
          setPassword('');  
        })  
        .catch((error) => {  
          console.log(error);  
        });  
    } else {  
      const newStudent = {  
        fname: fname,  
        lname: lname,  
        email: email,  
        password: password,  
        id: _id,  
      };  
  
      axios.post('http://lmspwc.eastus.cloudapp.azure.com:5000/students/add', newStudent)  
        .then(() => {  
          fetchStudents();  
          setFname('');  
          setLname('');  
          setEmail('');  
          setPassword('');  
        })  
        .catch((error) => {  
          console.log(error);  
        });  
    }  
  };  
  
  const handleDelete = (studentId) => {  
    axios.delete(`http://lmspwc.eastus.cloudapp.azure.com:5000/students/${studentId}`)  
      .then(() => {  
        fetchStudents();  
      })  
      .catch((error) => {  
        console.log(error);  
      });  
  };  
  
  const handleEdit = (student) => {  
    setFname(student.fname);  
    setLname(student.lname);  
    setEmail(student.email);  
    setPassword(student.password);  
    setSelectedStudentId(student._id);  
  };  
  
  // Check if userData.role is 'Trainer' before rendering the component  
  if (userData.role !== 'Trainer') {  
    return null;  
  }  
  
  return (  
    <div>  
      <table className="table table-dark table-striped">  
        <thead>  
          <tr>  
            <th>ID</th>  
            <th>First Name</th>  
            <th>Last Name</th>  
            <th>Email</th>  
            <th></th>  
          </tr>  
        </thead>  
        <tbody>  
          {students.map((student) => (  
            <tr key={student._id}>  
              <td>{student._id}</td>  
              <td>{student.fname}</td>  
              <td>{student.lname}</td>  
              <td>{student.email}</td>  
              <td>  
                {selectedStudentId === student._id ? (  
                  <>  
                    <input type="text" placeholder="New First Name" value={fname} onChange={(e) => setFname(e.target.value)} />  
                    <input type="text" placeholder="New Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />  
                    <input type="text" placeholder="New Email" value={email} onChange={(e) => setEmail(e.target.value)} />  
                    <button onClick={() => handleCreateOrUpdate(student.id, student._id)}>Update</button>  
                    <button onClick={() => setSelectedStudentId('')}>Cancel</button>  
                  </>  
                ) : (  
                  <>  
                    <button onClick={() => handleEdit(student)}>Edit</button>  
                    <button onClick={() => handleDelete(student._id)}>Delete</button>  
                  </>  
                )}  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
};  
  
export default StudentList;  
