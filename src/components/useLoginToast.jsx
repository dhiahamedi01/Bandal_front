import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const useLoginToast = () => {
  const navigate = useNavigate();

  const showLoginToast = () => {
    toast(
      ({ closeToast }) => (
        <div style={{ padding: "10px" }}>
          <p style={{ margin: 0, fontWeight: "500" }}>Please login Mr</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => {
                closeToast();
              }}
              style={{
                background: "transparent",
                border: "1px solid #ccc",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                closeToast();
                navigate("/login");
              }}
              style={{
                background: "black",
                color: "white",
                border: "none",
                padding: "5px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        hideProgressBar: true,
      }
    );
  };

  return showLoginToast;
};

export default useLoginToast;
