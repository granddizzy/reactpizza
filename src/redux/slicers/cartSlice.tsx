import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Item {
  id: number;
  count: number;
  imgUrl: string;
  title: string;
  type: number;
  price: number;
  size: number;
}

export interface  CartState {
  items: Item[];
  totalPrice: number;
  totalCount: number;
}

const loadCartState = (): CartState => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return {
        items: [],
        totalPrice: 0,
        totalCount: 0
      };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load cart state from localStorage', e);
    return {
      items: [],
      totalPrice: 0,
      totalCount: 0
    };
  }
};

const saveCartState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (e) {
    console.error('Could not save cart state to localStorage', e);
  }
};

const initialState: CartState = loadCartState();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Item>) => {
      const item = state.items.find(item => item.id === action.payload.id
        && item.size === action.payload.size && item.type === action.payload.type);
      if (item) {
        item.count++;
        state.totalPrice += action.payload.price;
      } else {
        state.items.push({...action.payload, count: 1});
        state.totalPrice += action.payload.price;
      }
      state.totalCount++;
      saveCartState(state);
    },
    delProduct: (state, action: PayloadAction<Item>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id
          && item.size === action.payload.size && item.type === action.payload.type);
      if (itemIndex > -1) {
        const item: Item = state.items[itemIndex];
        state.totalPrice -= item.price
        if (item.count > 1) {
          item.count--;
        } else {
          state.items.splice(itemIndex, 1);
        }
        state.totalCount--;
        saveCartState(state);
      }
    },
    delProductByCartID: (state, action) => {
      const itemToDelete = state.items[action.payload];
      // if (itemToDelete) {
      //state.items = state.items.filter(item => item.id !== action.payload);
      state.items.splice(action.payload, 1);
      state.totalPrice -= itemToDelete.price * itemToDelete.count;
      // }
      state.totalCount--;
      saveCartState(state);
    },
    clear: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
      saveCartState(state);
    },
    increaseCount: (state, action) => {
      const item = state.items[action.payload];
      if (item.count < 10) {
        item.count++;
        state.totalPrice += item.price;
        state.totalCount++;
        saveCartState(state);
      }
    },
    decreaseCount: (state, action) => {
      const item = state.items[action.payload];
      if (item.count > 1) {
        item.count--;
        state.totalPrice -= item.price;
        state.totalCount--;
        saveCartState(state);
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const {delProductByCartID, increaseCount, decreaseCount, clear, addProduct, delProduct} = cartSlice.actions;

export default cartSlice.reducer;