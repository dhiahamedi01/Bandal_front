// adminSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";


const adminSlice = createSlice({
  name: 'admin',
  initialState:{
  admin: Cookies.get('admin') || null,
  token: Cookies.get("userToken") || null,
  error: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload.admin;
    },
    setToken:(state, action)=>{
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.admin = null;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.error = null;
    },
  },
});


const authAdminReducer=adminSlice.reducer;
const authAdminActions = adminSlice.actions;

export {authAdminActions, authAdminReducer}