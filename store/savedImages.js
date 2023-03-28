import { createSlice } from "@reduxjs/toolkit";

const savedImagesSlice = createSlice({
  name: "savedImages",
  initialState: {
    changed: false,
    savedImages: [],
  },
  reducers: {
    replaceSavedImages(state, action) {
      state.changed = false;
      state.savedImages = action.payload.savedImages || [];
    },
    addImage(state, action) {
      if (
        state.savedImages.find(
          (savedImage) => savedImage.id === action.payload.id
        )
      )
        return state;
      else
        return {
          changed: true,
          savedImages: [
            ...state.savedImages,
            {
              id: action.payload.id,
              dateAdded: action.payload.dateAdded,
            },
          ],
        };
    },
    removeImage(state, action) {
      const savedImageIndex = state.savedImages.findIndex(
        (savedImage) => savedImage.id === action.payload.id
      );

      if (savedImageIndex === -1) return state;

      state.changed = true;
      state.savedImages.splice(savedImageIndex, 1);
    },
  },
});

export const savedImagesActions = savedImagesSlice.actions;
export default savedImagesSlice.reducer;
