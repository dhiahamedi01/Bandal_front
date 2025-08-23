import { createSlice } from "@reduxjs/toolkit";


const notProductSlice =createSlice({
    name: "notProduct",
    initialState:{
        notProducts:[],
        productByCollection:  JSON.parse(localStorage.getItem('product-by-collection'))|| [],
        name:"",
        description: "",
        categoryId: null,
        color: [],

        
    },
    reducers:{
        setNotProducts(state, action ){
            state.notProducts = action.payload;
        },

        deleteNotProducts(state, action) {
            state.notProducts = state.notProducts.filter(p => p._id !== action.payload);
            },

        setproductByCollection(state, action){
            state.productByCollection = action.payload
        }

    }





    },




)

const notProductReducer = notProductSlice.reducer;
const notProductAction = notProductSlice.actions;


export { notProductAction, notProductReducer}