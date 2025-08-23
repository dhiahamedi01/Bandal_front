import React, { useState, useEffect } from "react";
import "./Styles/LoginPage.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiCall/authCall";
import { useNavigate } from "react-router";
import { authActions } from "../redux/slice/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonComponent from "../components/ButtonComponent";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import Logo from "../assets/log.png";
import adminLogo from "../assets/adminLog.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenForOtp = urlParams.get("token");
    try {
      if (tokenForOtp) {
        // Send a request to your backend to verify the token
        axios
          .post(`https://bandali-back.vercel.app/api/admin/auth/login/${tokenForOtp}`)
          .then((response) => {
            // console.log("response", response);

            if (response.data.valid) {
              // console.log("first", response.data.user); // Console data here
              toast.success("Authenticated! Please login");
              navigate("/login");
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();
  
    if (!email || !password) return;
  
    dispatch(loginUser(email, password))
      .then((response) => {
        if (response && response.status === 200) {
          dispatch(
            authActions.login(JSON.parse(localStorage.getItem("userInfo")))
          );
          toast.success("Logged in Successfully !");
          navigate("/");
        } else {
          console.error("Login failed: Invalid credentials or no response");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };
  

  return (
    <MDBContainer className="my-5 margin-zero-auto">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="3">
            <img
              src={adminLogo}
              alt="login form"
              className="rounded-start img-login-admin-user w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <img className="logo" src={Logo} width={328} height={58} />
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                id="formControlLg"
                type="email"
                required
                size="sm"
                className="input-input-input"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                id="formControlLg"
                type="password"
                className="input-input-input"
                size="sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <ButtonComponent
                type="button"
                onClick={SubmitHandler}
                className="btn btn-primary btn-block"
              >
                Login
              </ButtonComponent>
            </MDBCardBody>

            <div className="loginpage-main-container-span d-flex align-items-left mt-3 ml-2">
              <p className="fs-5">
                Don’t you have an account? &nbsp;
                <span>
                  <a className=" fw-bold text-decoration-none" href="/signup">
                    Sign up
                  </a>
                </span>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginPage;
