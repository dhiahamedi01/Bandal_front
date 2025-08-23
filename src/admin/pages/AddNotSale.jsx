import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCollections } from "../../redux/apiCall/collectionCall";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import Cookies from "js-cookie";
import ButtonComponent from "../../components/ButtonComponent";

const AddNotSale = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collection.collections);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  // Initialize formData only when categories change (on mount)
  useEffect(() => {
    if (collections.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        collectionId: collections[0]._id,
      }));
    }
  }, [collections]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    collectionId: "",
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
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("collectionId", formData.collectionId);

      if (formData.image) {
        productData.append("image", formData.image);
      }

      const response = await axios.post(
        "https://bandali-back.vercel.app/api/products",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      const createdProduct = response.data;
      toast.success("Product added successfully!");
      navigate("/admin/notsale");
    } catch (error) {
      console.log(error);
      toast.error("Error adding product. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-row">
      <SidebarAdmin />
      <div className="container mt-4 admin-all-forms-containter">
        <h2>Add Not For Sale Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              onChange={handleInputChange}
              required
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
              onChange={handleInputChange}
              required
            ></input>
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
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Product Category */}
          <div className="mb-3">
            <label htmlFor="collectionId" className="form-label">
              Product collection:
            </label>
            <select
              className="form-select admin-all-forms-inputs"
              id="collectionId"
              name="collectionId"
              value={formData.collectionId}
              onChange={(e) => {
                // Update categoryId based on the selected option
                setFormData({ ...formData, collectionId: e.target.value });
              }}
              required
            >
              {collections.map((collection) => (
                <option key={collection._id} value={collection._id}>
                  {collection.collectionName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <ButtonComponent type="submit">Add Product</ButtonComponent>
        </form>
      </div>
    </div>
  );
};

export default AddNotSale;
