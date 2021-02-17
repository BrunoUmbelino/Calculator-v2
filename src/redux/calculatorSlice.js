import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: "0",
  expression: "",
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    clearState() {
      return initialState;
    },
    backSpaceExpression(state) {
        state.display = state.display.slice(0, -1)
        state.expression = state.expression.slice(0, -1)
    },
    setNumberInExpression(state, action) {
      const number = action.payload;
      state.display = number;
      state.expression += number;
    },
    addNumberInExpression(state, action) {
      const number = action.payload;
      state.display += number;
      state.expression += number;
    },
    addOperatorInExpression(state, action) {
      const operator = action.payload;
      state.display = operator;
      state.expression += operator;
    },
    setResult(state, action) {
      const result = action.payload;
      state.display = result;
      state.expression = result;
    },
  },
});

export const {
  clearState,
  backSpaceExpression,
  setNumberInExpression,
  addNumberInExpression,
  addOperatorInExpression,
  setResult,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
