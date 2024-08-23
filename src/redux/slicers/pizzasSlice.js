import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

// здесь создается ФУНКЦИЯ к которой добавляются еще свойства pending, fulfilled, rejected (потому что в js функция
// это объект) тд и какой-то нашей асинхронной логикой
export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({category, sort, limit, currentPage}, thunkAPI) => {
    const res = await axios.get(`https://lepihov.by/api/pizzas?category=${category}&sort_by=${sort}&limit=${limit}&page=${currentPage}`);
    return res.data;
  }
);

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: {
    pizzas: [],
    totalPages: 1,
  },
  reducers: {
    setPizzas: (state, action) => {
      state.pizzas = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = +action.payload;
    },
  },
  // здесь функция принимает объект builder и дополняет его обработчиками состояний pending, fulfilled, rejected
  // и возвращает его
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      //console.log('Fetching pizzas...');
    }).addCase(fetchPizzas.rejected, (state, action) => {
      console.error('Error fetching pizzas:', action.error);
    }).addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload.data;
      state.totalPages = action.payload.total;
    });
  }
});

// Action creators are generated for each case reducer function
export const {setPizzas} = pizzasSlice.actions;

export default pizzasSlice.reducer;