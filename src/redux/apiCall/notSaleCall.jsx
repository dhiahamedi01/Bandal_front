import axios from "axios";
import { notProductAction } from "../slice/notSaleSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


// Get all not for  products
export const getAllNotForSaleProduct=()=> {
    return async (dispatch) => {
      try {
        const { data } = await axios.get("https://bandali-back.vercel.app/api/products");
        dispatch(notProductAction.setNotProducts(data.data));
      } catch (error) {
      toast.error('bad connection ')
      }
    };
  }

// Get all not for  products
export const getByCollectionId=(id)=> {
  return async (dispatch) => {
    try {
      // console.log("Calling getByCollectionId action with collectionId:", id);
      const  data  = await axios.get(`https://bandali-back.vercel.app/api/products/bycollection/${id}`);
      // console.log('data fetched: ', data)
      dispatch(notProductAction.setproductByCollection(data))
      return data
    } catch (error) {
    toast.error('bad connection ', error.message)
    }
  };
}


  //delete product
  export const deleteNotForSaleProduct=(productId)=> {
    return async (dispatch) => {
      try {
        const token = Cookies.get("userToken");
        const { data } = await axios.delete(`https://bandali-back.vercel.app/api/products/${productId}`,     {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       
        dispatch(notProductAction.deleteNotProducts(data.productId));
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }}
