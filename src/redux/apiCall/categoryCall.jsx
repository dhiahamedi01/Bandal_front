import axios from "axios";
import { categoryActions } from "../slice/categorySlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";



export const getAllCategory = () => {
  return async (dispatch) => {
     try {
       const { data } = await axios.get("https://bandali-back.vercel.app/api/category");
       if (Array.isArray(data.data)) {
         dispatch(categoryActions.setCategories(data.data));
         dispatch(categoryActions.setCategoryCount(data.data.length));
       } else {
         console.error("API did not return an array");
       }
     } catch (error) {
       console.error("Error fetching categories:", error);
       toast.error('Bad connection or server error');
     }
  };
 };

// Delete category
export const deleteCategory=(categoryId)=> {
  return async (dispatch, getState) => {
     try {
       const { data } = await axios.delete(`https://bandali-back.vercel.app/api/category/${categoryId}`,
       {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
       const currentCategories = getState().category.categories;
       const updatedCategories = currentCategories.filter(category => category._id !== categoryId);
       dispatch(categoryActions.setCategories(updatedCategories));
       toast.success(data.message);
     } catch (error) {
       toast.error(error.response.data.message);
     }
  }
 }