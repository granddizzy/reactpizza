import {configureStore} from '@reduxjs/toolkit';
import categoryReducer from './slicers/categorySlice';
import sortReducer from './slicers/sortSlice';
import paginationReducer from "./slicers/paginationSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    sort: sortReducer,
    pagination: paginationReducer,
  },
});