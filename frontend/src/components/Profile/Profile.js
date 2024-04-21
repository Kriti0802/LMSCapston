import React, { useEffect, useState } from 'react';  
import './Profile.css'; 
import profileImage from './img.webp';
  
const Profile = () => {  
  const [profileData, setProfileData] = useState({});  
  
  useEffect(() => {  
    const storedProfileData = JSON.parse(localStorage.getItem('user'));  
    setProfileData(storedProfileData);  
  }, []);  
  
  return (  
    <div className="profile-page">  
      <div className="profile-header">  
      <img src={profileImage} alt="Profile Picture" className="profile-picture" />   
        <h1 className="profile-name">{profileData.fname} {profileData.lname}</h1>  
        {/* <p className="profile-bio">{profileData.email}</p>   */}
        <p className="profile-bio">{profileData.role}</p>  
      </div>  
      <div className="profile-content">  
        <h2>Email-Id</h2>  
        <p>{profileData.email}</p>  
      </div>  
    </div>  
  );  
};  
  
export default Profile;  
