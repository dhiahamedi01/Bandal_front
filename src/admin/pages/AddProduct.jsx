import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategory } from "../../redux/apiCall/categoryCall";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import Cookies from "js-cookie";
import ButtonComponent from "../../components/ButtonComponent";
import "./Styles/DifferentForms.css";

const AddProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
    categoryId: "",
    color: [],
  });

  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");

  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prev) => ({ ...prev, categoryId: categories[0]._id }));
    }
  }, [categories]);

  const handleColor = () => {
    setColors([...colors, colorInput]);
    setColorInput("");
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      if (files.length > 5) {
        toast.error("You can upload a maximum of 5 images.");
        return;
      }
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("categoryId", formData.categoryId);

      colors.forEach((color) => productData.append("color", color));

      formData.images.forEach((img) => productData.append("images", img));

      await axios.post("https://bandali-back.vercel.app/api/productsale", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      toast.success("Product added successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error("Error adding product. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-row">
      <SidebarAdmin />
      <div className="container mt-4 admin-all-forms-containter">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              className="form-control admin-all-forms-inputs"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description">Product Description:</label>
            <input
              className="form-control admin-all-forms-inputs"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price">Product Price:</label>
            <input
              type="number"
              className="form-control admin-all-forms-inputs"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="images">Product Images (max 5):</label>
            <input
              type="file"
              className="form-control admin-all-forms-inputs"
              name="images"
              accept="image/*"
              onChange={handleInputChange}
              multiple
              required
            />
          </div>

          <div className="mb-3">
            <label>Product Colors:</label>
            <ul>
              {colors.map((color, index) => (
                <li key={index}>{color}</li>
              ))}
            </ul>
            <input
              className="form-control admin-all-forms-inputs"
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Add color"
            />
            <button type="button" className="btn btn-warning mt-2" onClick={handleColor}>
              Add Color
            </button>
          </div>

          <div className="mb-3">
            <label>Product Category:</label>
            <select
              className="form-select admin-all-forms-inputs"
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              required
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <ButtonComponent type="submit">Add Product</ButtonComponent>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
