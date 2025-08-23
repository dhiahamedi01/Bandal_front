import logo from "../assets/logo.jpg";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Styles/Footer.css";
import Logo from "../assets/log.png";
import footer from "../assets/footer.jpg"
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Conditionally render the Footer based on the route
  if (location.pathname.includes("/admin")) {
    return null; // Don't render Navbar for admin routes
  }

  return (
    <>
      <MDBFooter
        bgColor="primary"
        className="bg-white text-black text-center text-sm-left"
        style={{
          borderTop: "1px solid #000", 
          backgroundImage: `url(${footer})`,
          backgroundSize: "cover",      
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "center"  
        }}
      >
        <div className=" class-footer-main-components p-5">
          <MDBRow className="class-footer-main-components-row d-flex">
            <MDBCol lg="1" md="6" className=" ">
              <img
                src={Logo}
                className="img-img-footer"
                width="220px"
                alt="footer logo"
              />
            </MDBCol>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h4>Quick Links</h4>
              <a href="/">
                <h5 className="text-uppercase">Home</h5>
              </a>
              <a href="/about">
                <h5 className="text-uppercase">About us</h5>
              </a>
              <a href="/categories">
                <h5 className="text-uppercase">Products</h5>
              </a>
              <a href="/contact">
                <h5 className="text-uppercase">Contact us</h5>
              </a>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <a href="/termsconditions">
                <h5 className="text-uppercase">Terms & Conditions</h5>
              </a>
              <a href="/privacypolicy">
                <h5 className="text-uppercase">Privacy Policy</h5>
              </a>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Contact Info</h5>
              <h5 className="text-uppercase">03 729 086 </h5>
              {/* Social Media Icons */}
              <div className="text-center">
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  href="https://www.facebook.com/michelbandalidesign"
                  role="button"
                >
                  <FaFacebookF />
                </a>
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  href="https://www.instagram.com/michelbandalidesign/"
                  role="button"
                >
                  <FaInstagram />
                </a>
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  href="https://www.linkedin.com/in/michel-bandali-61390138/"
                  role="button"
                >
                  <FaLinkedin />
                </a>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBFooter>
      <div
        className="bg-black text-white text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-white" href="https://mdbootstrap.com/">
          CODEX
        </a>
      </div>
    </>
  );
};

export default Footer;
