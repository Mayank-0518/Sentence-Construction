import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { fetchQuestions, nextQuestion } from './redux/features/questionsSlice'
import { resetTimer, startTimer, stopTimer } from './redux/features/timerSlice'
import Question from './components/Question'
import ProgressBar from './components/ProgressBar'
import ResultsPage from './components/ResultsPage'
import Timer from './components/Timer'
import HomePage from './components/HomePage'
import QuizPage from './components/QuizPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPageWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}

function ResultsPageWrapper() {
  const navigate = useNavigate()
  
  return (
    <ResultsPage 
      onGoToDashboard={() => navigate('/')}
    />
  )
}

export default App