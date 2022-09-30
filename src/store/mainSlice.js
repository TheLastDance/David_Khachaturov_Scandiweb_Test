import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
    name: 'redux',
    initialState: {
        cartList: [],
        test: 1,
    },
    reducers: {
        testReducer(state) {
            state.test++;
        }
    }
});


export const { testReducer } = mainSlice.actions;

export default mainSlice;
