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
        toast.warning("you need to be logged in to access!");
        return navigate('/login') ;
      }
    

    // If authenticated, render the child routes
    return <Outlet />;
  }

export default UserProtectedRoute;