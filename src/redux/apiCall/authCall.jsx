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
export const logoutUser = (navigate) => {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    dispatch(authActions.login(null));

    toast.info(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-4 p-4">
          {/* Image utilisateur ronde */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User avatar"
            className="w-14 h-14 rounded-full shadow-md border border-gray-300"
          />

          {/* Message */}
          <p className="text-sm font-semibold text-gray-800 text-center">
            You have been logged out. Please log in to continue.
          </p>

          {/* Boutons */}
          <div className="flex gap-3 w-full justify-center">
            <button
              onClick={() => {
                navigate("/login");
                closeToast();
              }}
              className="w-28 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-2xl shadow-md transition-transform transform hover:scale-105"
            >
              Log in
            </button>
            <button
              onClick={closeToast}
              className="w-28 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-2xl shadow-sm transition-transform transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false, draggable: false }
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
