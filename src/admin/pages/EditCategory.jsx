import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import Cookies from "js-cookie";
import ButtonComponent from "../../components/ButtonComponent";

const EditCategory = () => {
  const location = useLocation();
  const { categoryId } = location.state;
  const { categoryName } = location.state;

  const handleImageChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: categoryName,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);

      // If there's an image file, append it to the FormData
      if (formData.image) {
        productData.append("image", formData.image);
      }

      const response = await axios.put(
        `https://bandali-back.vercel.app/api/category/${categoryId}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      toast.success("Product updated successfully");
      navigate("/admin/category");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update product");
    }
  };
  return (
    <div className="d-flex flex-row">
      <SidebarAdmin />

      <div className="container admin-all-forms-containter mt-4">
        <h2>Edit Category</h2>
        <form encType="multipart/form-data">
          {/* Product Name */}
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
          <ButtonComponent onClick={handleUpdate} type="submit">
            Update Category
          </ButtonComponent>
        </form>
      </div>
    </div>
  );
};
export default EditCategory;
