import { React, useState, useEffect } from "react";
import "./Styles/UserProfile.css";
import { LuUserCircle } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";
import { BiPhone } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/edit-profile");
  };

  const handleManageLoc = () => {
    navigate("/manage-location");
  };

  const handleLocationChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLocationId(selectedValue);
    localStorage.setItem("selectedLocationId", selectedValue);
  };

  // Fetching data from local storage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const storedLocationId = localStorage.getItem("selectedLocationId");

  useEffect(() => {
    if (storedLocationId !== null) {
      setSelectedLocationId(storedLocationId);
    }
  }, [storedLocationId]);

  return (
    <>
      <div className="Company-main-account-profile d-flex">
        <div className="profile-with-name ">
          {/* Displaying company information directly */}
          <img
            className="rounded-circle image-profile-main-acc"
            alt="avatar"
            src={user[0].data.userImage}
            width="250px"
            height="250px"
          />
          <h1 className="account-title-name">{user[0].data.username}</h1>
          <ButtonComponent onClick={handleClick}>Edit Profile</ButtonComponent>
          <ButtonComponent onClick={handleManageLoc}>
            Manage Locations
          </ButtonComponent>
        </div>
        <div className="card-components-main d-flex flex-column">
          <h1 className="userprofile-two-sentences">Personal Info</h1>
          <h5 className="text-muted userprofile-two-sentences">
            Manage your personal info, including your phone number and addresses
            where you can be contacted.
          </h5>
          <div className="card-components-all-main">
            <div className="single-container-component-main d-flex flex-column">
              <div className="name-icon-same-container d-flex">
                <h4>First Name</h4>
                <LuUserCircle className="icon-color-style" />
              </div>
              <span className="text-muted">{user[0].data.firstName}</span>
            </div>
            <div className="single-container-component-main d-flex flex-column">
              <div className="name-icon-same-container d-flex">
                <h4>Last Name</h4>
                <BiUser className="icon-color-style" />
              </div>
              <span className="text-muted">{user[0].data.lastName}</span>
            </div>
            <div className="single-container-component-main d-flex flex-column">
              <div className="name-icon-same-container d-flex">
                <h4>Phone Number</h4>
                <BiPhone className="icon-color-style" />
              </div>
              <span className="text-muted">{user[0].data.phone}</span>
            </div>
            <div className="single-container-component-main d-flex flex-column">
              <div className="name-icon-same-container d-flex">
                <h4>Email</h4>
                <IoIosMail className="icon-color-style" />
              </div>
              <span className="text-muted">{user[0].data.email}</span>
            </div>
            <div className="single-container-component-main d-flex flex-column">
              <div className="name-icon-same-container d-flex">
                <h4>Location</h4>
                <BiWorld className="icon-color-style" />
              </div>
              <select
                className="form-select text-muted"
                value={selectedLocationId || ""}
                onChange={handleLocationChange}
              >
                <option value="">Select a location</option>
                {user[0].data.locations.map((location) => (
                  <option key={location._id} value={location._id}>
                    {`City: ${location.city}, Street: ${location.street}, Building: ${location.building}, Floor: ${location.floor}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
