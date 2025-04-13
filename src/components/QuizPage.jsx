import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestions, nextQuestion } from '../redux/features/questionsSlice'
import { resetTimer, startTimer, stopTimer } from '../redux/features/timerSlice'
import Question from './Question'
import ProgressBar from './ProgressBar'
import Timer from './Timer'

function QuizPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { 
    questions, 
    currentQuestionIndex, 
    status, 
    error, 
    blanksFilled 
  } = useSelector(state => state.questions)
  const { timeRemaining, isExpired } = useSelector(state => state.timer)
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuestions())
    }
  }, [status, dispatch])

  useEffect(() => {
    if (isExpired) {
      if (currentQuestionIndex === questions.length - 1) {
        navigate('/results')
      } else {
        dispatch(nextQuestion())
        dispatch(resetTimer())
        dispatch(startTimer())
      }
    }
  }, [isExpired, currentQuestionIndex, questions, dispatch, navigate])

  useEffect(() => {
    if (status === 'succeeded' && questions.length > 0) {
      dispatch(resetTimer())
      dispatch(startTimer())
    }
  }, [status, questions, dispatch])

  useEffect(() => {
    if (status === 'succeeded' && questions.length > 0) {
      dispatch(resetTimer())
      dispatch(startTimer())
    }
  }, [currentQuestionIndex, dispatch, questions.length, status])
  
  const handleQuit = () => {
    dispatch(stopTimer())
    navigate('/')
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-3 sm:p-4 bg-gray-50">
      {status === 'loading' && <p className="text-center mt-8">Loading questions...</p>}
      
      {error && <p className="text-red-500 text-center mt-8">{error}</p>}
      
      {status === 'succeeded' && questions.length > 0 && (
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <Timer />
            <button 
              className="px-3 sm:px-4 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={handleQuit}
            >
              Quit
            </button>
          </div>
          
          <ProgressBar 
            total={questions.length} 
            current={currentQuestionIndex + 1} 
          />
          
          <div className="mt-4 sm:mt-8">
            <Question />
          </div>
          
          <div className="mt-4 sm:mt-6 flex justify-end">
            <button 
              onClick={() => {
                if (currentQuestionIndex === questions.length - 1) {
                  dispatch(stopTimer())
                  navigate('/results')
                } else {
                  dispatch(nextQuestion())
                }
              }}
              disabled={!blanksFilled}
              className="px-4 sm:px-8 py-1.5 sm:py-2 text-sm sm:text-base bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white shadow-sm"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : (
                <div className="flex items-center">
                  Next <span className="ml-2">→</span>
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizPage