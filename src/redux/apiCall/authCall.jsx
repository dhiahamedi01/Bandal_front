import { authActions } from "../slice/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//login user import { authActions } from './authSlice';

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      console.log("Sending login:", { email, password });
      const response = await axios.post(
        "https://bandali-back.vercel.app/api/user/login",
        {
          email, // ou username selon ce que le backend attend
          password,
        }
      );
      console.log("Response login:", response);
      dispatch(authActions.login(response.data.message));
      localStorage.setItem("userInfo", JSON.stringify([response.data]));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data;
    } catch (error) {
      if (error.response) {
        // Message d'erreur envoyé par le backend
        const backendMessage = error.response.data.message || "Unauthorized";
        toast.error(backendMessage);
        console.log("Backend error message:", backendMessage);
      } else {
        toast.error("Network error or no response from server");
      }
    }
    
  };
};



//logout User
export const logoutUser = (user, navigate) => {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    dispatch(authActions.login(null));

    // Toast avec boutons personnalisés
    toast.warning(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Please log in to continue</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                navigate("/login");
                closeToast();
              }}
              className="bg-black text-white px-3 py-1 rounded-md"
            >
              Log in
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 text-black px-3 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false, // laisse l’utilisateur choisir
        closeOnClick: false,
        draggable: false,
      }
    );
  };
};
//register user

export function registerUser(user) {
  return async (dispatch) => {
    try {
      const data = await axios.post(
        "https://bandali-back.vercel.app/api/user/signup",
        user
      );
      // console.log(data.code);
      dispatch(authActions.register(data.message));
      if (data.status == 200) {
        toast.warning("Please Check Your Email!");
      } else {
        toast.error("Email or Username already used!");
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error("Email or Username already exists!");
      }
    }
  };
}
