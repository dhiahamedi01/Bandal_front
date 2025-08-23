import React, { useState } from "react";
import axios from "axios";
import ButtonComponent from "../components/ButtonComponent";
import "./Styles/UserProfile.css";
import { useDispatch } from "react-redux";
import {authActions} from '../redux/slice/authSlice.jsx'
const NewLocationForm = ({ onSubmit }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch()
  const userId = user[0].data._id; // Use optional chaining to avoid errors if user or data is undefined

  const initialAddress = {
    city: "",
    street: "",
    building: "",
    floor: "",
    description: "",
  };

  const [newAddress, setNewAddress] = useState(initialAddress);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://bandali-back.vercel.app/api/user/addlocation/${userId}`,
        newAddress
      );

      // console.log("Response from server:", response.data.user);

      onSubmit(response.data.user);
      
      // Update localStorage with the new user data
     
      localStorage.setItem("userInfo", JSON.stringify([{data:response.data.user}]));

      // Reset the form on successful submission
      setNewAddress(initialAddress);
      setError("");
      dispatch(authActions.setUser((JSON.parse(localStorage.getItem("userInfo")))))
      localStorage.setItem("userInfo", JSON.stringify([{data:response.data.user}]));

    } catch (error) {
      console.error("Error adding location:", error);
      setError("Error adding location. Please try again.");
    }
  };

  return (
    <div className="new-loc-form-container">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-danger">{error}</p>}
        <div className="mb-3">
          <label htmlFor="city" className="form-label location-form-labels">
            City:
          </label>
          <input
            type="text"
            className="form-control location-form-city location-form-inputs"
            id="city"
            name="city"
            value={newAddress.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="street" className="form-label location-form-labels">
            Street:
          </label>
          <input
            type="text"
            className="form-control location-form-street location-form-inputs"
            id="street"
            name="street"
            value={newAddress.street}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="building" className="form-label location-form-labels">
            Building:
          </label>
          <input
            type="text"
            className="form-control location-form-building location-form-inputs"
            id="building"
            name="building"
            value={newAddress.building}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="floor" className="form-label location-form-labels">
            Floor:
          </label>
          <input
            type="number"
            className="form-control location-form-floor location-form-inputs"
            id="floor"
            name="floor"
            value={newAddress.floor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className="form-label location-form-labels"
          >
            Description:
          </label>
          <input
            type="text"
            className="form-control location-form-description location-form-inputs"
            id="description"
            name="description"
            value={newAddress.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <ButtonComponent type="submit" className="location-form-submit">
            Add Location
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default NewLocationForm;
