import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await axios.get("http://localhost:3000/data");
    return response.data;
  }
);

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  status: "idle", 
  error: null,
  userSelections: [], //to store selected options(in order) for every qstn
  blanksFilled: false
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
        

        const currentQuestion = state.questions[state.currentQuestionIndex];
        const questionParts = currentQuestion.question.split("_____________");
        const blankCount = questionParts.length - 1;
        
        const currentQuestionSelections = state.userSelections.filter(
          selection => selection.questionIndex === state.currentQuestionIndex
        );
        
        state.blanksFilled = currentQuestionSelections.length === blankCount;
      }
    },
    selectWord: (state, action) => {
      const { word, blankIndex } = action.payload;
      
      const existingSelectionIndex = state.userSelections.findIndex(
        selection => selection.blankIndex === blankIndex && 
                    selection.questionIndex === state.currentQuestionIndex
      );
      
      if (existingSelectionIndex !== -1) {
        state.userSelections[existingSelectionIndex].word = word;
      } else {
        state.userSelections.push({ 
          questionIndex: state.currentQuestionIndex,
          blankIndex, 
          word 
        });
      }
      
      // Check if all blanks for the current question are filled
      const questionParts = state.questions[state.currentQuestionIndex].question.split("_____________");
      const filledBlanksCount = state.userSelections.filter(
        selection => selection.questionIndex === state.currentQuestionIndex
      ).length;
      
      state.blanksFilled = filledBlanksCount === (questionParts.length - 1);
    },
    unselectWord: (state, action) => {
      const { blankIndex } = action.payload;
      
      state.userSelections = state.userSelections.filter(
        selection => !(selection.blankIndex === blankIndex && 
                      selection.questionIndex === state.currentQuestionIndex)
      );
      
      state.blanksFilled = false;
    },
    resetSelections: (state) => {
      state.userSelections = [];
      state.blanksFilled = false;
      state.currentQuestionIndex = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload.questions;
        state.userSelections = []; // Reset selections when loading new questions
        state.currentQuestionIndex = 0;
        state.blanksFilled = false;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { 
  nextQuestion, 
  selectWord, 
  unselectWord,
  resetSelections
} = questionsSlice.actions;

export default questionsSlice.reducer;