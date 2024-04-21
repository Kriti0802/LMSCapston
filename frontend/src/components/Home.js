import React from 'react';  
import './Home.css';  
import Footer from './Footer/Footer';  
  
function Home() {  
  return (  
    <>  
      <div className="homeContainer" style={{ backgroundColor: "#ddeedf" }}>  
        <div className="textOverlay">  
          <h2 className="title">WELCOME</h2>  
          <p className="subtitle">To our CloudHunt</p>  
        </div>  
      </div>  
  
      <Footer />  
    </>  
  );  
}  
  
export default Home;  
