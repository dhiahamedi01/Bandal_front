import { createSlice } from "@reduxjs/toolkit";

// ⚠️ On récupère ce qu'il y a dans le localStorage en essayant de parser du JSON en toute sécurité
let storedUser = null;
let storedToken = null;

try {
  storedUser = JSON.parse(localStorage.getItem('userInfo'));
} catch (e) {
  storedUser = null;
}

try {
  storedToken = JSON.parse(localStorage.getItem('token'));
} catch (e) {
  storedToken = null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser || null,
    token: storedToken || null,
    registerMessage: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    }
  }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
