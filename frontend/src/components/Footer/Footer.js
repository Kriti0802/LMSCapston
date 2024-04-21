import './Footer.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';    

  
const Footer = () => {  
  return (  
    <footer className="text-center text-lg-start text-white footer">  
      <section className="d-flex justify-content-between p-4 footer-top">  
       
      </section>  
      <section className="footer-content">  
        <div className="container text-center text-md-start mt-5">  
          <div className="row mt-6">  
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">  
              <h6 className="text-uppercase fw-bold">CloudHunt</h6>  
              <hr  
                className="mb-4 mt-0 d-inline-block mx-auto"  
                style={{  
                  width: '40px',  
                  backgroundColor: '#7c4dff',  
                  height: '2px',  
                }}  
              />  
              <p>  
                At CloudHunt, we are dedicated to providing high-quality cloud training courses. Our platform is designed to help individuals and organizations gain the knowledge and skills needed to excel in the rapidly evolving field of cloud computing.  
              </p>  
            </div>  
            <div className="col-md-6 col-lg-6  mx-auto mb-4">  
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">  
                <h6 className="text-uppercase fw-bold">Contact</h6>  
                <hr  
                  className="mb-4 mt-0 d-inline-block mx-auto"  
                  style={{  
                    width: '60px',  
                    backgroundColor: '#7c4dff',  
                    height: '2px',  
                  }}  
                />  
                <p>  
                  <i className="fas fa-home mr-3"></i> New York, NY 10012, US  
                </p>  
                <p>  
                  <i className="fas fa-envelope mr-3"></i> info@example.com  
                </p>  
                <p>  
                  <i className="fas fa-phone mr-3"></i> + 01 234 567 88  
                </p>  
                <p>  
                  <i className="fas fa-print mr-3"></i> + 01 234 567 89  
                </p>  
              </div>  
            </div>  
          </div>  
        </div>  
      </section>  
      <div className="text-center p-3 footer-bottom">  
        © 2024 CloudHunt.com  
      </div>  
    </footer>  
  );  
};    
  
export default Footer;  
