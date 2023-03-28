import { configureStore } from "@reduxjs/toolkit";

import savedImagesReducer from "./savedImages";
import searchHistoryReducer from "./searchHistory";

const store = configureStore({
  reducer: {
    savedImages: savedImagesReducer,
    searchHistory: searchHistoryReducer,
  },
});

export default store;
