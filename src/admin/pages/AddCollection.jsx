import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCollection,
  getAllCollections,
} from "../../redux/apiCall/collectionCall.jsx";
import SidebarAdmin from "../components/SidebarAdmin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent.jsx";

const AddCollectionForm = () => {
  const collections = useSelector((state) => state.collection);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    collectionName: "",
    collectionDescription: "",
    collectionImage: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.files
        ? event.target.files[0]
        : event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("collectionName", formData.collectionName);
    data.append("collectionDescription", formData.collectionDescription);
    data.append("collectionImage", formData.collectionImage);

    try {
      dispatch(addNewCollection(data)).then(() => {
        dispatch(getAllCollections());
      });
      setFormData({
        collectionName: "",
        collectionDescription: "",
        collectionImage: "",
      });
      // reset image
      event.target.elements["collectionImage"].value = "";
      toast.success("Collection added successfully!");
      navigate("/admin/admincollections");
    } catch (error) {
      console.error("Error adding new collection:", error.message);
      toast.error("Error adding Collection. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-row">
      <SidebarAdmin />
      <div className="container mt-4 admin-all-forms-containter">
        <h2>Add Collection</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="d-flex flex-column ">
              Collection Name:
              <input
                className="form-control admin-all-forms-inputs"
                type="text"
                name="collectionName"
                value={formData.collectionName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="d-flex flex-column ">
              Collection description:
              <textarea
                className="form-control admin-all-forms-inputs"
                type="text"
                name="collectionDescription"
                value={formData.collectionDescription}
                onChange={handleChange}
                required
                style={{ height: "200px" }}
                maxLength={1600}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="d-flex flex-column ">
              Collection Image:
              <input
                className="form-control admin-all-forms-inputs"
                type="file"
                name="collectionImage"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <ButtonComponent type="submit">Add Collection</ButtonComponent>
        </form>
      </div>
    </div>
  );
};

export default AddCollectionForm;
