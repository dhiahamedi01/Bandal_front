import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ButtonComponent from "../components/ButtonComponent";
import "./Styles/UserEditProfile.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/slice/authSlice";
const UserEditProfile = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state)=>state.auth)
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [phone, setPhone] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userId = user[0].data._id;
  const token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://bandali-back.vercel.app/api/user/${userId}`
        );
        setUsername(response.data.username);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUserImage(response.data.userImage);
        setPreviewUrl(response.data.userImage);
        setPhone(response.data.phone);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);

      // Append the image file to the form data
      if (userImage instanceof File) {
        formData.append("userImage", userImage);
      }

      const response = await axios.put(
        `https://bandali-back.vercel.app/api/user/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("After state update:", userImage);
      // console.log("reponse:  ", response);

      const updatedUser = { data: response.data };
      localStorage.setItem("userInfo", JSON.stringify([updatedUser]));
      dispatch(
        authActions.setUser(JSON.parse(localStorage.getItem("userInfo")))
      );
      // Update the state of your form fields with the new data
      setUsername(response.data.username);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setUserImage(response.data.userImage);
      setPreviewUrl(response.data.userImage);
      setPhone(response.data.phone);

      navigate("/profile");

      toast.success("Profile edited successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error("Please try again!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUserImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    // console.log("Updated state:", userImage);
  }, [userImage]);

  return (
    <div className=" userprofile-main-container">
      <Row className="d-flex mb-2">
        {/* Profile Image */}
        <img
          src={previewUrl}
          alt="Profile"
          className="userpage-profile-image"
        />
      </Row>

      {/* User Information Form */}
      <Form onSubmit={handleEdit}>
        <Row>
          {/* Left Side */}
          <Col lg={6} md={12}>
            <Form.Group className="userpage-profile-form" controlId="firstName">
              <Form.Label className="userpage-profile-labels">
                First Name
              </Form.Label>
              <Form.Control
                className="userpage-profile-inputs"
                type="text"
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </Form.Group>

            <Form.Group className="userpage-profile-form" controlId="lastName">
              <Form.Label className="userpage-profile-labels">
                Last Name
              </Form.Label>
              <Form.Control
                className="userpage-profile-inputs"
                type="text"
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </Form.Group>

            <Form.Group className="userpage-profile-form" controlId="username">
              <Form.Label className="userpage-profile-labels">
                Username
              </Form.Label>
              <Form.Control
                className="userpage-profile-inputs"
                type="text"
                placeholder="Choose a username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>
          </Col>

          {/* Right Side */}
          <Col lg={6} md={12}>
            <Form.Group className="userpage-profile-form">
              <Form.Label className="userpage-profile-labels">Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                className="userpage-profile-image-input"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="userpage-profile-form" controlId="phone">
              <Form.Label className="userpage-profile-labels">Phone</Form.Label>
              <Form.Control
                className="userpage-profile-inputs"
                type="tel"
                placeholder="Enter your phone number"
                pattern="[0-9]*"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row>
          <Col className="text-center aaaaa">
            <ButtonComponent type="submit">Save</ButtonComponent>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserEditProfile;
