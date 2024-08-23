import {configureStore} from '@reduxjs/toolkit';
// import categoryReducer from './slicers/categorySlice';
// import sortReducer from './slicers/sortSlice';
// import paginationReducer from "./slicers/paginationSlice";
import filterReducer from "./slicers/filterSlice";
import cartReducer from "./slicers/cartSlice";
import pizzasReducer from "./slicers/pizzasSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
    // pagination: paginationReducer,
  },
});