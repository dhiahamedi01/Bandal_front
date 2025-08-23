import axios from "axios";
import { productActions } from "../slice/productSlice";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Get all products
export const getAllProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("https://bandali-back.vercel.app/api/productsale");
      dispatch(productActions.setProducts(data.data));
      // console.log("all fetched products:  ", data);
    } catch (error) {
      toast.error("bad connection ");
    }
  };
};

//delete product
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `https://bandali-back.vercel.app/api/productsale/${productId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      dispatch(productActions.deleteProducts(data.productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://bandali-back.vercel.app/api/productsale/${id}`);
      console.log("Product fetched:", data); // 👈 pour debugger
      dispatch(productActions.setProductDetail(data.data)); 
    } catch (error) {
      console.error("Erreur fetching product:", error); // 👈 pour debugger
      toast.error(error.response?.data?.message || "Erreur lors de la récupération du produit");
    }
  };
};


//edit product
export const editProduct = (productId, updatedProductData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `https://bandali-back.vercel.app/api/productsale/${productId}`,
        updatedProductData
      );
      dispatch(
        productActions.editProducts(data.productId, data.updatedProduct)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

//create product

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (newProduct, thunkAPI) => {
    try {
      // console.log("newProduct:", newProduct);
      const { data } = await axios.post(
        "https://bandali-back.vercel.app/api/productsale",
        newProduct
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getProductsByCategoryId = (categoryId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://bandali-back.vercel.app/api/productsale/bycategory/${categoryId}`
      );
      dispatch(productActions.setProductsByCategory(data.data));

      //  console.log("this is data:",data.data);

      return data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
