import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import Cookies from "js-cookie";
import ButtonComponent from "../../components/ButtonComponent";

const AddCategory = () => {
  const categories = useSelector((state) => state.category.categories);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const categoryData = new FormData();
      categoryData.append("name", formData.name);

      // If there's an image file, append it to the FormData
      if (formData.image) {
        categoryData.append("image", formData.image);
      }

      const response = await axios.post(
        "https://bandali-back.vercel.app/api/category",
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      const createdcategory = response.data;

      toast.success("Category added successfully!");
      navigate("/admin/category");
    }catch (error) {
      console.error("Backend error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Error adding category.");
    }
  };

  return (
    <div className="d-flex flex-row">
      <SidebarAdmin />
      <div className="container mt-4 admin-all-forms-containter">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* category Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Category Name:
            </label>
            <input
              type="text"
              className="form-control admin-all-forms-inputs"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Category Image */}
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
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <ButtonComponent type="submit">Add Category</ButtonComponent>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
