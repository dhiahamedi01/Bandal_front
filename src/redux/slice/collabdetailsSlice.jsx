import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collectionName: "",
    collectionDescription: "",
    collectionImage: "",
    collectionsCount: 0,
  },
  reducers: {
    setCollections(state, action) {
      const { collectionName, collectionDescription, collectionImage, collectionsCount } = action.payload;
      state.collectionName = collectionName;
      state.collectionDescription = collectionDescription;
      state.collectionImage = collectionImage;
      state.collectionsCount = collectionsCount;
    },
    // ... other reducers
  },
});

const collectionReducer = collectionSlice.reducer;
const collectionActions = collectionSlice.actions;

export { collectionActions, collectionReducer };
