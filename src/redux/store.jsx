import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slice/productSlice";
import { categoryReducer } from "./slice/categorySlice";
import { authReducer } from "./slice/authSlice";
import { orderReducer } from "./slice/orderSlice";
import { collectionReducer } from "./slice/collectionSlice";
import { cartReducer } from "./slice/cartSlice";
import { notProductReducer } from "./slice/notSaleSlice";
import { userReducer } from "./slice/userSlice";
import { authAdminReducer } from "./slice/authAdminSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    auth: authReducer,
    order: orderReducer,
    cart: cartReducer,
    collection: collectionReducer,
    notProduct: notProductReducer,
    user: userReducer,
    admin: authAdminReducer,
    },
  
});

export default store;
