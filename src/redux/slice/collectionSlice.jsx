import { createSlice } from "@reduxjs/toolkit";

const initialCollectionCount = parseInt(
  localStorage.getItem("collectionCount")
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collections: [],
    loading: false,
    collection: null,
    collectionCount: initialCollectionCount,
    singleCollection: [],
    isCollectionCreated: false,
    collectionName: "",
    collectionDescription: "",
    collectionImage: "",
  },
  reducers: {
    setCollections(state, action) {
      state.collections = action.payload;
    },
    setCollectionCount(state, action) {
      state.collectionCount = action.payload;
      localStorage.setItem("collectionCount", action.payload.toString());
    },
    addCollection: (state, action) => {
      state.data = action.payload;
    },
    updateFetchedData(state, action) {
      state.collections = action.payload;
    },
    setSingleCollection(state, action) {
      state.singleCollection = action.payload;
    },

    deleteCollection(state, action) {
      state.collections = state.collections.filter(
        (collection) => collection._id !== action.payload
      );
    },
  },
});

const collectionReducer = collectionSlice.reducer;
const collectionActions = collectionSlice.actions;

export { collectionActions, collectionReducer };
