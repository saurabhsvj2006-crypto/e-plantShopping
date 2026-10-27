
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find(
        item => item.name === plant.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          quantity: 1
        });
      }
    },

    removeItem: (state, action) => {
      const plantName = action.payload;
      state.items = state.items.filter(
        item => item.name !== plantName
      );
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(
        plant => plant.name === name
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            plant => plant.name !== name
          );
        } else {
          item.quantity = quantity;
        }
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
