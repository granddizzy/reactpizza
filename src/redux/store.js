import {configureStore} from '@reduxjs/toolkit';
// import categoryReducer from './slicers/categorySlice';
// import sortReducer from './slicers/sortSlice';
// import paginationReducer from "./slicers/paginationSlice";
import filterReducer from "./slicers/filterSlice";
import cartReducer from "./slicers/cartSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    // pagination: paginationReducer,
  },
});