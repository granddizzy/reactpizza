import {createSlice} from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    category: 0,
    currentPage: 1,
    totalPages: 1,
    sort: 0,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = +action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = +action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = +action.payload;
    },
    setSort: (state, action) => {
      state.sort = +action.payload;
    },
    setFilters: (state, action) => {
      state.currentPage = +action.payload.currentPage;
      state.category = +action.payload.category;
      state.sort = +action.payload.sort;
      state.totalPages = action.payload.totalPages;
    },
  }
});

// Action creators are generated for each case reducer function
export const {setFilters, setCategory, setCurrentPage, setTotalPages, setSort} = filterSlice.actions;

export default filterSlice.reducer;