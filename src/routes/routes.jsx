import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Admin from "../admin/pages/Admin.jsx";

// Pages
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Cart from "../pages/Cart.jsx";
import UserEditProfile from "../pages/UserEditProfile.jsx";
import Shop from "../pages/shop.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import Categories from "../pages/Categories.jsx";
import AddProduct from "../admin/pages/AddProduct.jsx";
import CategoryAdmin from "../admin/pages/CategoryAdmin.jsx";
import RegistrationForm from "../pages/RegistrationForm.jsx";
import OrderHistory from "../pages/OrderHistory.jsx";
import TermsAndConditions from "../pages/Terms&Conditions.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import EditProduct from "../admin/pages/EditProduct.jsx";
import AddCategory from "../admin/pages/AddCategory.jsx";
import EditCategory from "../admin/pages/EditCategory.jsx";
import ManageLoc from "../pages/ManageLoc.jsx";
import ProductCategory from "../pages/ProductCategory.jsx";

import CollabDetails from "../pages/CollabDetails.jsx";
import AddCollectionForm from "../admin/pages/AddCollection.jsx";
import NotSaleAdmin from "../admin/pages/NotSaleAdmin.jsx";
import AddNotSale from "../admin/pages/AddNotSale.jsx";
import NotSaleEdit from "../admin/pages/NotSaleEdit.jsx";
import AdminCollection from "../admin/pages/AdminCollection.jsx";
import EditCollection from "../admin/pages/EditCollection.jsx";
import AdminOrder from "../admin/pages/AdminOrder.jsx";
import AdminUser from "../admin/pages/AdminUser.jsx";
import ConfirmOrder from "../components/ConfirmOrder.jsx";
import AdminLogin from "../admin/pages/AdminLogin.jsx";
import Basic from "../components/AfterConfirmation.jsx";
import AddCollection from "../admin/pages/AddCollection.jsx";
import ProductDetail from '../pages/ProductDetail.jsx';
//protecting the routes
import UserProtectedRoute from "./userProtectedRoutes.jsx";
import AdminProtectedRoute from "./adminProtectedRoutes.jsx";
import Request from "../pages/Request.jsx";
import Requestadmin from"../admin/pages/Request.jsx";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<RegistrationForm />} />
      {/* Client */}
      <Route element={<UserProtectedRoute />}>
        <Route path="/track" element={<Basic />} />
      </Route>
      <Route element={<UserProtectedRoute />}>
        <Route path="/confirm" element={<ConfirmOrder />} />
      </Route>
      <Route element={<UserProtectedRoute />}>
        <Route path="/myorder" element={<Cart />} />
      </Route>
      <Route element={<UserProtectedRoute />}>
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      <Route element={<UserProtectedRoute />}>
        <Route path="/edit-profile" element={<UserEditProfile />} />
      </Route>
      <Route element={<UserProtectedRoute />}>
        <Route path="/myorders" element={<OrderHistory />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Categories />} />
      <Route path="/Request" element={<Request />} />
      <Route path="/allproducts" element={<Shop />} />
      <Route path="/termsconditions" element={<TermsAndConditions />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/collection/:id" element={<CollabDetails />} />
      <Route element={<UserProtectedRoute />}>
        <Route path="manage-location" element={<ManageLoc />} />
      </Route>
      <Route path="categoryproduct" element={<ProductCategory />} />
      <Route path="product/:id" element={<ProductDetail />} /> 
      {/* Admin */}
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin" element={<Admin />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/addproduct" element={<AddProduct />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/editproduct" element={<EditProduct />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/category" element={<CategoryAdmin />} />
      </Route>
      {/* <Route path="/admin/addcollection" element={<AddCollectionForm />} /> */}
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/addcategory" element={<AddCategory />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/editcategory" element={<EditCategory />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/request" element={<Requestadmin />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/notsale" element={<NotSaleAdmin />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/addnotsale" element={<AddNotSale />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/editnotsale" element={<NotSaleEdit />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/admincollections" element={<AdminCollection />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/addcollection" element={<AddCollection />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route
        path="/admin/admin-edit-collections"
        element={<EditCollection />}
      />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/adminorder" element={<AdminOrder />} />
      </Route>
      <Route element={<AdminProtectedRoute/>}>
      <Route path="/admin/user" element={<AdminUser />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AppRoutes;
