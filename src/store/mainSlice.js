import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
    name: 'redux',
    initialState: {
        cartList: [],
        test: 1,
        currency: '$',
        totalQuantity: 0,
    },
    reducers: {
        testReducer(state) {
            state.test++;
        },

        changeCurrency(state, action) {
            state.currency = action.payload;
        },

        addToCartFromDetails(state, action) {
            const attr = action.payload.attr;
            const product = action.payload.item;
            const selectedAttributes = [...attr].map((item, index) => ({ name: product.attributes[index].name, id: product.attributes[index].items[item].id }));
            const existId = state.cartList.find(item => item.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes));
            // here I decided to use JSON.stringify method to compare arrays, because we aren't allowed to use many libraries.
            // I dont need here types of my object keys values, also my objects in the array are always in the same order, so I think this is not as bad solution.

            if (existId) {
                existId.quantity++;
                state.totalQuantity++;
            } else {
                state.cartList.push({
                    ...product,
                    selectedAttributes,
                    quantity: 1,
                });
                state.totalQuantity++;
            }
        }
    }
});


export const { testReducer, changeCurrency, addToCartFromDetails } = mainSlice.actions;

export default mainSlice;
