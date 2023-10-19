import { configureStore } from "@reduxjs/toolkit";
import sellerSlice from "./reducers/sellerSlice";
import productSlice from "./reducers/productSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import ordersSlice from "./reducers/ordersSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  sellersData: sellerSlice,
  productData: productSlice,
  orderData:ordersSlice

});

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
