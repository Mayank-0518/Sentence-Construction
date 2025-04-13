import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeRemaining: 30, 
  isRunning: false,
  isExpired: false
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
      state.isExpired = false;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.timeRemaining = 30;
      state.isRunning = false;
      state.isExpired = false;
    },
    decrementTimer: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
      if (state.timeRemaining === 0) {
        state.isRunning = false;
        state.isExpired = true;
      }
    }
  }
});

export const { 
  startTimer, 
  stopTimer, 
  resetTimer, 
  decrementTimer 
} = timerSlice.actions;

export default timerSlice.reducer;