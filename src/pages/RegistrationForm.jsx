import React, { useState } from 'react';
import { registerUser } from "../redux/apiCall/authCall";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
 const dispatch = useDispatch();
 const { registerMessage } = useSelector(state => state.auth);

 const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    username: '',
    password: '',
 });

 const [verifyPassword, setVerifyPassword] = useState(''); // New state for verification password

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


 
 const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) return toast.error("First Name is Required");
    if (!formData.lastName.trim()) return toast.error("Last Name is Required");
    if (!formData.phone.trim()) return toast.error("Phone Number is Required");
    if (!formData.email.trim()) return toast.error("Email is Required");
    if (!formData.username.trim()) return toast.error("UserName is Required");
    if (!formData.password.trim()) return toast.error("Password is Required");
    if (formData.password !== verifyPassword){return toast.error("Passwords do not match")}
    dispatch(registerUser(formData));
    console.log("Handling signup...");
    console.log('Form submitted:', formData);
 };


 const navigate = useNavigate();

    if(registerMessage) {
        swal({
            title: registerMessage,
            icon: "success"
        }).then(isOk => {
            if(isOk) {
               navigate("/login");
            }
        })
    }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>

      <br />

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>

      <br />

      <label>
        Phone Number:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </label>

      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <br />

      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>

      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>

      <br />

      <label>
        Verify Password:
        <input
          type="password"
          name="verifyPassword"
          value={verifyPassword}
          onChange={handleVerifyPasswordChange}
        />
      </label>

      <br />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
