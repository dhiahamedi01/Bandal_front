import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { getAllCategory } from "../../redux/apiCall/categoryCall";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import Cookies from "js-cookie";
import ButtonComponent from "../../components/ButtonComponent";

const EditProduct = () => {
  // Extracting the product ID from the location state
  const location = useLocation();
  const { productId } = location.state;
  const { productName } = location.state;
  const { productDescription } = location.state;
  const { productPrice } = location.state;
  const { productCategoryId } = location.state;
  const { productColor } = location.state;

  const handleImageChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const dispatch = useDispatch();
  // Fetching categories from Redux state
  const categories = useSelector((state) => state.category.categories);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  // Initialize formData only when categories change (on mount)
  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        categoryId: categories[0]._id,
      }));
    }
  }, [categories]);

  const { loading, error } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: productName,
    description: productDescription,
    price: productPrice,
    categoryId: productCategoryId,
    color: [productColor],
  });

  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");

  const handleColor = () => {
    setColors([...colors, colorInput]);
    setColorInput("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("categoryId", formData.categoryId);

      // Append each color to the FormData as an array
      colors.forEach((color) => productData.append("color", color));

      // If there's an image file, append it to the FormData
      if (formData.image) {
        productData.append("image", formData.image);
      }

      const response = await axios.put(
        `https://bandali-back.vercel.app/api/productsale/${productId}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      toast.success("Product updated successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="d-flex flex-row">
      <SidebarAdmin />
      <div className="container mt-4 admin-all-forms-containter">
        <h2>Edit Product</h2>
        <form encType="multipart/form-data">
          {/* Product Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Product Name:
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

          {/* Product Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Product Description:
            </label>
            <input
              className="form-control admin-all-forms-inputs"
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></input>
          </div>

          {/* Product Price */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Product Price:
            </label>
            <input
              type="number"
              className="form-control admin-all-forms-inputs"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          {/* Product Image */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Product Image:
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

          {/* Product Color */}
          <div className="mb-3">
            <label htmlFor="color" className="form-label">
              Product Color:
            </label>

            <ul className="ullllllll">
              {colors.map((color, index) => (
                <li key={index}>{color}</li>
              ))}
            </ul>
            <input
              type="text"
              className="form-control admin-all-forms-inputs"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Add color"
            />
            <button
              type="button"
              className="btn btn-warning mt-2"
              onClick={handleColor}
            >
              Add Color
            </button>
          </div>

          {/* Product Category */}
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">
              Product Category:
            </label>
            <select
              className="form-select admin-all-forms-inputs"
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              {/* Mapping through categories to generate options */}
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <ButtonComponent type="submit" onClick={handleUpdate}>
            Update Product
          </ButtonComponent>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
