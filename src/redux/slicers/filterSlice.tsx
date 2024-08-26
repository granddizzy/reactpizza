import {createSlice} from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    category: 0,
    currentPage: 1,
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
    setSort: (state, action) => {
      state.sort = +action.payload;
    },
    setFilters: (state, action) => {
      state.currentPage = +action.payload.currentPage;
      state.category = +action.payload.category;
      state.sort = +action.payload.sort;
    },
  }
});

// Action creators are generated for each case reducer function
export const {setFilters, setCategory, setCurrentPage, setSort} = filterSlice.actions;

export default filterSlice.reducer;