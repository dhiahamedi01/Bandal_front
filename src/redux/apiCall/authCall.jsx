import { authActions } from "../slice/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "14px",
            gap: "12px",
          }}
        >
          {/* Image utilisateur ronde */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User avatar"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ddd",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
    
          {/* Message */}
          <p style={{ fontSize: "14px", fontWeight: 500, textAlign: "center", margin: 0 }}>
            You have been logged out. <br /> Please log in to continue.
          </p>
    
          {/* Boutons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
            <button
              onClick={() => {
                navigate("/login");
                closeToast();
              }}
              style={{
                minWidth: "100px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "6px 12px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#333")}
              onMouseOut={(e) => (e.target.style.background = "black")}
            >
              Log in
            </button>
    
            <button
              onClick={closeToast}
              style={{
                minWidth: "100px",
                background: "#f2f2f2",
                color: "#333",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "6px 12px",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#e0e0e0")}
              onMouseOut={(e) => (e.target.style.background = "#f2f2f2")}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
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
