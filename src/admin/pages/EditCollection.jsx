import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import Cookies from "js-cookie";
import ButtonComponent from "../../components/ButtonComponent";

const EditCollection = () => {
  const location = useLocation();
  const { collectionId } = location.state;
  const { collectionName } = location.state;
  const { collectionDescription } = location.state;
  // console.log("collectionDescription", collectionDescription);

  const handleImageChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    collectionName: collectionName,
    collectionDescription: collectionDescription,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("collectionName", formData.collectionName);
      productData.append(
        "collectionDescription",
        formData.collectionDescription
      );

      // If there's an image file, append it to the FormData
      if (formData.image) {
        productData.append("image", formData.image);
      }

      const response = await axios.put(
        `https://bandali-back.vercel.app/api/collection/${collectionId}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      toast.success("Collection updated successfully");
      navigate("/admin/admincollections");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update product");
    }
  };
  return (
    <div className="d-flex flex-row">
      <SidebarAdmin />

      <div className="container admin-all-forms-containter mt-4">
        <h2>Edit Collection</h2>
        <form encType="multipart/form-data">
          {/* Product Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Collection Name:
            </label>
            <input
              type="text"
              className="form-control admin-all-forms-inputs"
              id="collectionName"
              name="collectionName"
              value={formData.collectionName}
              onChange={(e) =>
                setFormData({ ...formData, collectionName: e.target.value })
              }
            />
          </div>

          {/* Product Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Collection description:
            </label>
            <textarea
              type="text"
              className="form-control admin-all-forms-inputs"
              id="collectionDescription"
              name="collectionDescription"
              style={{ height: "200px" }}
              maxLength={1700}
              value={formData.collectionDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  collectionDescription: e.target.value,
                })
              }
            />
          </div>

          {/* Category  Image */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Category Image:
            </label>
            <input
              type="file"
              className="form-control admin-all-forms-inputs"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Submit Button */}
          <ButtonComponent onClick={handleUpdate}>
            Update Collection
          </ButtonComponent>
        </form>
      </div>
    </div>
  );
};
export default EditCollection;
