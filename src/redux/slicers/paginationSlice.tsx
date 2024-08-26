import {createSlice} from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    page: 1,
    total: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = filterSlice.actions
export const {setTotal, setPage} = paginationSlice.actions

export default paginationSlice.reducer;