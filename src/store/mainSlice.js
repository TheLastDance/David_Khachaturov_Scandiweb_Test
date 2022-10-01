import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
    name: 'redux',
    initialState: {
        cartList: [],
        test: 1,
        currency: '$',
    },
    reducers: {
        testReducer(state) {
            state.test++;
        },

        changeCurrency(state, action) {
            state.currency = action.payload;
        }
    }
});


export const { testReducer, changeCurrency } = mainSlice.actions;

export default mainSlice;
