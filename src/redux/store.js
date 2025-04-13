import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./features/questionsSlice";
import timerReducer from "./features/timerSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    timer: timerReducer
  }
});