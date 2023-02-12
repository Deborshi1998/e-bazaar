import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from "./cart/userCart";
import userTokenReducer from "./cart/userToken";

const store = configureStore({
    reducer: {
        userCart: userCartReducer,
        userToken: userTokenReducer,
    },
});

export default store;