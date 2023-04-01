import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slice/categogiesSlice";
import categoryProductsReducer from "../slice/categoryProductsSlice";
import productsReducer from "../slice/productsSlice";
import singleProductReducer from "../slice/singleProductSlice";
import searchReducer from "../slice/searchSlice"

export default configureStore({
  reducer: {
    category: categoriesReducer,
    categoryProducts: categoryProductsReducer,
    products: productsReducer,
    singleProduct: singleProductReducer,
    search: searchReducer,
  },
});
