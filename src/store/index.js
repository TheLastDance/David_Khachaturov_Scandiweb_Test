import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";

const store = configureStore({
    reducer: {
        redux: mainSlice.reducer,
    },
});

export default store;