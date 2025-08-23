import "./Styles/SignupPage.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../redux/apiCall/authCall";
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
import adminLogo from "../assets/bandaliiii.jpg";

const SignupPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const [verifyPassword, setVerifyPassword] = useState(""); // New state for verification password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isStrongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
        formData.password
      );

    if (!formData.firstName.trim())
      return toast.error("First Name is Required");
    if (!formData.lastName.trim()) return toast.error("Last Name is Required");
    if (!formData.phone.trim()) return toast.error("Phone Number is Required");
    if (!formData.email.trim()) return toast.error("Email is Required");
    if (!formData.username.trim()) return toast.error("username is Required");
    if (!formData.password.trim()) return toast.error("Password is Required");
    if (formData.password !== verifyPassword) {
      return toast.error("Passwords do not match!");
    }

    if (!isStrongPassword) {
      return toast.error(
        "Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    dispatch(registerUser(formData));
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

          <MDBCol md="3">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <img alt="logo-img" className="logo" src={Logo} width={328} height={58} />
              </div>
              <div className="inputs-for-singup">
                <MDBInput
                  wrapperClass="mb-4"
                  id="formControlLg"
                  type="text"
                  name="firstName"
                  required
                  size="sm"
                  className="input-input-input"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  id="formControlLg"
                  type="text"
                  name="lastName"
                  className="input-input-input"
                  size="sm"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

                <MDBInput
                  wrapperClass="mb-4"
                  id="formControlLg"
                  type="text"
                  name="username"
                  className="input-input-input"
                  size="sm"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />

                <MDBInput
                  wrapperClass="mb-4"
                  id="formControlLg"
                  pattern="[0-9]*"
                  className="input-input-input"
                  size="sm"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </MDBCardBody>
          </MDBCol>

          <MDBCol md="4" py="5">
            <MDBCardBody className="d-flex flex-column">
              <div className="inputs-for-singup2">
                <MDBInput
                  wrapperClass="mb-4"
                  id="formControlLg"
                  type="email"
                  className="input-input-input"
                  size="sm"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <MDBInput
                  wrapperClass="mb-4"
                  id="formControlLg"
                  type="password"
                  className="input-input-input"
                  size="sm"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <MDBInput
                  wrapperClass="mb-4"
                  id="formControlLg"
                  type="password"
                  className="input-input-input"
                  size="sm"
                  name="verifyPassword"
                  placeholder="Verify your password"
                  value={verifyPassword}
                  onChange={handleVerifyPasswordChange}
                  required
                />
                <ButtonComponent
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-block"
                >
                  Sign Up
                </ButtonComponent>
                <div className="signup-main-container-span d-flex align-items-left mt-3 ml-2">
                  <p className="fs-5 signup-main-container-form-text">
                    Already a member?
                    <span className="signup-main-container-span">
                      <a href="/login">&nbsp;Log in now</a>
                    </span>
                  </p>
                </div>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignupPage;
