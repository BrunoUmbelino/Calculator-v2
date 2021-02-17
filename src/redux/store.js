import { configureStore } from "@reduxjs/toolkit";
import calculatorReducers from "./calculatorSlice";

export const store = configureStore({
  reducer: calculatorReducers,
});
