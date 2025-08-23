import axios from "axios";
import { collectionActions } from "../slice/collectionSlice.jsx";
import { toast } from "react-toastify";
import Cookies from "js-cookie";



export const getAllCollections = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get("https://bandali-back.vercel.app/api/collection");
      // console.log("Collections fetched:", data.data.data);
      localStorage.setItem("collection", JSON.stringify(data.data.data));

      // Dispatch the setCollections action as before
      dispatch(
        collectionActions.setCollections(
          JSON.parse(localStorage.getItem("collection"))
        )
      );
      dispatch(
        collectionActions.setCollectionCount(
          JSON.parse(localStorage.getItem("collection")).length
        )
      );

      // Dispatch the setCollections action as before
      dispatch(collectionActions.setCollections(data.data.data));
      dispatch(collectionActions.setCollectionCount(data.data.data.length));
      return data;

      // Dispatch the new action to update the state with fetched data
    } catch (error) {
      console.error("Error fetching collections:", error);
      toast.error("Bad connection or server error");
    }
  };
};

export const addNewCollection = (newCollection) => {
  return async (dispatch, getState) => {
    try {
      const data = await axios.post(
        "https://bandali-back.vercel.app/api/collection",
        newCollection,  {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      // console.log("New collection added:", data.data.data);
      dispatch(collectionActions.setCollections(data.data.data));
      dispatch(collectionActions.setCollectionCount(data.data.data.length));
      return data;
    } catch (error) {
      console.error("Error adding new collection:", error);
      throw error;
    }
  };
};

export const getSingleCollection = (id) => {
  return async (dispatch) => {
    try {
      const data  = await axios.get(
        `https://bandali-back.vercel.app/api/collection/${id}`
      );
      // console.log( 'data from api',data.data)
      
      dispatch(collectionActions.setSingleCollection(data));
      // console.log("API Response:", data); // Log the response
      return data.data
    } catch (error) {
      console.error("Error fetching single collection:", error.message);
    }
  };
};


//Delete collection



export const deleteCollection = (collectionId) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("userToken");
      const { data } = await axios.delete(
        `https://bandali-back.vercel.app/api/collection/${collectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(collectionActions.deleteCollection(collectionId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
