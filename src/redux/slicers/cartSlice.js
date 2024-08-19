import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id
        && item.size === action.payload.size && item.type === action.payload.type);
      if (item) {
        item.count++;
        state.totalPrice += action.payload.price;
      } else {
        state.items.push({...action.payload, count: 1});
        state.totalPrice += action.payload.price;
      }
    },
    delProduct: (state, action) => {
      const itemToDelete = state.items[action.payload];
      if (itemToDelete) {
        //state.items = state.items.filter(item => item.id !== action.payload);
        state.items.splice(action.payload, 1);
        state.totalPrice -= itemToDelete.price;
      }
    },
    clear: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  }
});

// Action creators are generated for each case reducer function
export const {clear, addProduct, delProduct} = cartSlice.actions;

export default cartSlice.reducer;