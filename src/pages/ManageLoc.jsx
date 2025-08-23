import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./Styles/ManageLoc.css";
import axios from "axios";
import NewLocationForm from "./NewLocationForm.jsx";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent.jsx";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/slice/authSlice.jsx";
import { toast } from "react-toastify";
const ManageLoc = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  const [showNewLocationForm, setShowNewLocationForm] = useState(false);
  const navigate = useNavigate();

  const GoBack = () => {
    navigate("/profile");
  };

  const handleDelete = async (locationId) => {
    const userId = user[0].data._id;
    const response = await axios.delete(
      `https://bandali-back.vercel.app/api/user/user/${userId}/locations/${locationId}`
    );

    if (response.status !== 200) {
      console.error("Failed to delete location");
      return;
    }
    toast.success('Location Deleted Successfully !')


    // console.log("first", response.data.data)
    localStorage.setItem("userInfo", JSON.stringify([{data:response.data.data}]));

    dispatch(authActions.setUser(JSON.parse(localStorage.getItem("userInfo"))))
  };

  const openNewLocationForm = () => {
    setShowNewLocationForm(true);
  };

  const closeNewLocationForm = () => {
    setShowNewLocationForm(false);
  };

  const handleNewLocationSubmit = async (newAddress) => {
    closeNewLocationForm();

    const updatedUser = {
      ...user,
      data: {
        ...user[0].data,
        locations: [...user[0].data.locations, newAddress],
      },
    };
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    dispatch(authActions.setUser(updatedUser));

    //navigate to prev page
    toast.success('Location Added Successfully !')
    navigate("/manage-location");
  };

  return (
    <div className="manage-loc-page d-flex">
      <div className="manage-loc-buttons">
        <ButtonComponent onClick={GoBack}>Go Back</ButtonComponent>
        {user[0].data.locations.length < 10 && (
          <ButtonComponent onClick={openNewLocationForm}>
            Add Location
          </ButtonComponent>
        )}
      </div>

      <div className="manage-loc-table">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>City</th>
              <th>Street</th>
              <th>Building</th>
              <th>Floor</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user[0].data.locations.map((location) => (
              <tr key={location._id}>
                <td className="text-center px-0 color-red-400">
                  {location.city}
                </td>
                <td>{location.street}</td>
                <td>{location.building}</td>
                <td>{location.floor}</td>
                <td>{location.description}</td>
                <td>
                  <FaTrash
                    className="manage-loc-delete-icon"
                    onClick={() => handleDelete(location._id)}
                  >
                    Delete
                  </FaTrash>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {showNewLocationForm && (
        <div className="location-form-overlay">
          <div className="location-form-modal">
            <span
              className="location-form-close-button"
              onClick={closeNewLocationForm}
            >
              &times;
            </span>
            <NewLocationForm onSubmit={handleNewLocationSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLoc;
