import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UserProtectedRoute = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('userInfo')
  
  // const [status, setStatus ] = useState(true)
  const navigate = useNavigate();

    //function to verify admin token
    // const verify = async()=>{
    //   try {
    //     const response = await axios.post(`https://bandali-back.vercel.app/api/admin/users/v`,
    //     {
    //       token:token,
    //       isAdmin:false
    //     })
    //     console.log('response from verify function',response)
    //       setStatus(true)
    
    //   } catch (error) {
    //     if(error.response.status === 401)
    //     setStatus(false)
        
    //   }
    // }
    // useEffect(()=>{verify()}, [])
  
    // Check if the user is an admin
    if (!token && !user) {
     
      // If not authenticated, redirect to the login page
        toast.warning(
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
              you need to be logged in to access!
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
        return navigate('/login') ;
      }
    

    // If authenticated, render the child routes
    return <Outlet />;
  }

export default UserProtectedRoute;