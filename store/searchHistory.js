import { createSlice } from "@reduxjs/toolkit";
const MAX_SEARCH_HISTORY = 4;

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: {
    changed: false,
    searchHistory: [],
  },
  reducers: {
    replaceSearchHistory(state, action) {
      state.changed = false;
      state.searchHistory = action.payload.searchHistory || [];
    },
    addSearch(state, action) {
      if (
        state.searchHistory.find((search) => search === action.payload.search)
      )
        return state;
      else {
        let searchHistoryToAdd = state.searchHistory;

        if (state.searchHistory.length >= MAX_SEARCH_HISTORY) {
          searchHistoryToAdd = searchHistoryToAdd.slice(
            0,
            MAX_SEARCH_HISTORY - 1
          );
        }
        return {
          changed: true,
          searchHistory: [action.payload.search, ...searchHistoryToAdd],
        };
      }
    },
  },
});

export const searchHistoryActions = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
