import { createSlice } from "@reduxjs/toolkit";
const initialCategoryCount = parseInt(localStorage.getItem("categoryCount")) || 0;


const categorySlice = createSlice({
 name: "category",
 initialState: {
    categories:[],
    loading: false,
    isCategoryCreated: false,
    category:null,
    categoryCount:initialCategoryCount,
 },
 reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setCategoryCount(state, action) {
      state.categoryCount = action.payload;
      localStorage.setItem("categoryCount", action.payload.toString());

    },
 },
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export { categoryActions, categoryReducer };