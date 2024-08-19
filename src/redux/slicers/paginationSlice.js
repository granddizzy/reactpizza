import {createSlice} from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    page: 1,
    total: 1,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
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
export const {setTotal, setPage, decrement, increment} = paginationSlice.actions

export default paginationSlice.reducer;