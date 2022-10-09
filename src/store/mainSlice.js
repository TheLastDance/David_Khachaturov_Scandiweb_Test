import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
    name: 'redux',
    initialState: {
        cartList: [],
        test: 1,
        currency: '$',
        totalQuantity: 0,
        totalPriceAll: 0,
        deleted: 5,
    },
    reducers: {
        testReducer(state) {
            state.test++;
        },

        changeCurrency(state, action) {
            state.currency = action.payload; // our state will get the value of the selected currency symbol
            state.cartList = state.cartList.map(item => ({ ...item, itemPrice: item.prices.filter(item => item.currency.symbol === state.currency)[0].amount })) // will change products price depending on new currency
            state.cartList = state.cartList.map(item => ({ ...item, totalPrice: (Math.round(item.itemPrice * item.quantity * 100) / 100) })) //price of all the same products in cart depending on new currency
            state.totalPriceAll = (Math.round(state.cartList.reduce(function (a, b) { return a + b.totalPrice; }, 0) * 100) / 100).toFixed(2);//count price of all products depending on new currency
            //also rounds to hundredths
        },

        addToCartFromDetails(state, action) {
            const attr = action.payload.attr;
            const product = action.payload.item;
            const selectedAttributes = [...attr].map((item, index) => ({ name: product.attributes[index].name, id: product.attributes[index].items[item].id }));
            const existId = state.cartList.find(item => item.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes));
            // here I decided to use JSON.stringify method to compare arrays, because we aren't allowed to use many libraries.
            // I dont need here types of my object-keys values, also my objects in the array are always in the same order, so I think this is not as bad solution.

            if (existId) {
                existId.quantity++; //quantity og the same product (attributes the same also)
                state.totalQuantity++; //quantity of all products
                state.cartList = state.cartList.map(item => ({ ...item, totalPrice: (Math.round(item.itemPrice * item.quantity * 100) / 100) })) //price of all the same products in cart
                state.totalPriceAll = (Math.round(state.cartList.reduce(function (a, b) { return a + b.totalPrice; }, 0) * 100) / 100).toFixed(2);
            } else {
                state.cartList.push({
                    ...product,
                    selectedAttributes,
                    quantity: 1,
                    itemPrice: product.prices.filter(item => item.currency.symbol === state.currency)[0].amount, //filter to push products price in current currency.
                    totalPrice: product.prices.filter(item => item.currency.symbol === state.currency)[0].amount, //if this product is new in cart, we need just price of 1 quantity
                });
                state.totalQuantity++;
                state.totalPriceAll = (Math.round(state.cartList.reduce(function (a, b) { return a + b.totalPrice; }, 0) * 100) / 100).toFixed(2);
            }
        },

        addToCartFromItemList(state, action) {
            //this function will add product in cart with default attribute(first attributes) values from the PLP.
            const product = action.payload.item;
            const selectedAttributes = product.attributes.map(item => ({ name: item.name, id: item.items[0].id }));
            const existId = state.cartList.find(item => item.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes));
            if (existId) {
                existId.quantity++; //quantity og the same product (attributes the same also)
                state.totalQuantity++; //quantity of all products
                state.cartList = state.cartList.map(item => ({ ...item, totalPrice: (Math.round(item.itemPrice * item.quantity * 100) / 100) })) //price of all the same products in cart
                state.totalPriceAll = (Math.round(state.cartList.reduce(function (a, b) { return a + b.totalPrice; }, 0) * 100) / 100).toFixed(2);
            } else {
                state.cartList.push({
                    ...product,
                    selectedAttributes,
                    quantity: 1,
                    itemPrice: product.prices.filter(item => item.currency.symbol === state.currency)[0].amount, //filter to push products price in current currency.
                    totalPrice: product.prices.filter(item => item.currency.symbol === state.currency)[0].amount, //if this product is unique in cart, we need just price of 1 quantity
                });
                state.totalQuantity++;
                state.totalPriceAll = (Math.round(state.cartList.reduce(function (a, b) { return a + b.totalPrice; }, 0) * 100) / 100).toFixed(2);
            }
        },

        removeFromCart(state, action) {
            //this function will remove products from the cart
            const product = action.payload.item;
            const existId = state.cartList.find(item => item.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes));

            if (existId.quantity === 1) {
                state.deleted = state.cartList.indexOf(existId);//defines index of item which was deleted. Needed for sliders functions in react.
                state.deletedIndex = 1;
                state.cartList = state.cartList.slice(0, state.cartList.indexOf(existId)).concat(state.cartList.slice(state.cartList.indexOf(existId) + 1, state.cartList.length));
                //here I will just copy my cart array without existId product
                state.totalQuantity--;
                state.totalPriceAll = (Math.round((state.totalPriceAll - existId.itemPrice) * 100) / 100).toFixed(2);
            } else {
                existId.quantity--;
                existId.totalPrice = (Math.round((existId.totalPrice - existId.itemPrice) * 100) / 100);
                state.totalQuantity--;
                state.totalPriceAll = (Math.round((state.totalPriceAll - existId.itemPrice) * 100) / 100).toFixed(2);
            }
        },

        reduceQuantity(state, action) {
            //this function will reduce quantity of product from the cart
            const product = action.payload.item;
            const existId = state.cartList.find(item => item.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes));
            existId.quantity++;
            state.cartList = state.cartList.map(item => ({ ...item, totalPrice: (Math.round(item.itemPrice * item.quantity * 100) / 100) }))
            state.totalQuantity++;
            state.totalPriceAll = (Math.round(state.cartList.reduce(function (a, b) { return a + b.totalPrice; }, 0) * 100) / 100).toFixed(2);
        }
    }
});


export const { testReducer, changeCurrency, addToCartFromDetails, addToCartFromItemList, removeFromCart, reduceQuantity } = mainSlice.actions;

export default mainSlice;
