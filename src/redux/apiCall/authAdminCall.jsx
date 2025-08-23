import { authAdminActions } from "../slice/authAdminSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';






export const AdminAuthLogin = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://bandali-back.vercel.app/api/admin/login', { username, password });
      const { data } = response;

      Cookies.set('userToken', data.token, { expires: 7 });
      Cookies.set('admin', data.data);

      dispatch(authAdminActions.setAdmin(data.data));
      dispatch(authAdminActions.setToken(data.token));

      toast.success(data.message);
      return data;
    } catch (error) {
      dispatch(authAdminActions.loginFailure(error.message));
      console.error(error, error.message);
      throw error;
    }
  };
};



   export const logoutAdmin = () => {
    return (dispatch) => {
      dispatch(authAdminActions.logout());
      Cookies.remove('userToken');
      Cookies.remove('admin');
      return
    };
  };
     

