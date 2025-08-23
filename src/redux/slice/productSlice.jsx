import { createSlice } from "@reduxjs/toolkit";



const initialProductCount = parseInt(localStorage.getItem("productCount")) || 0;


const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    name: "",
    description: "",
    price: null,
    categoryId: null,
    color: [],
    loading: false,
    isProductCreated: false,
    product: null,
    productsCount: initialProductCount,
    productsByCategory: [],
    productDetail: null, 
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProductsCount(state, action) {
      state.productsCount = action.payload;
      localStorage.setItem("productCount", action.payload.toString());
    },
    updateProductCount(state, action) {
      state.productsCount = action.payload;
    },
    deleteProducts(state, action) {
      state.products = state.products.filter(p => p._id !== action.payload);
    },
    editProducts(state, action) {
      state.products = state.products.map(p => p._id === action.payload._id ? action.payload : p);
    },
    setProductsByCategory(state, action) {
      state.productsByCategory = action.payload;
    },
    setProductDetail(state, action) { // ✅ ajouter ce reducer
      state.productDetail = action.payload;
    }
  },
});


const productReducer = productSlice.reducer;
const productActions = productSlice.actions;

export { productActions, productReducer };
