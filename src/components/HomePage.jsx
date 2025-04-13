import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="w-full py-3 sm:py-5 px-4 sm:px-6 border-b border-gray-300 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-base sm:text-lg font-medium">Sentence Construction</h1>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Sentence Construction</h1>
        
        <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-lg px-2">
          Select the correct words to complete the sentence by arranging 
          the provided options in the right order.
        </p>
        
        <div className="w-full max-w-3xl mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12">
            <div className="flex flex-col items-center">
              <h3 className="text-gray-600 mb-1 sm:mb-2 text-base sm:text-lg font-bold">Time Per Question</h3>
              <p className="text-lg sm:text-xl">30 sec</p>
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-gray-600 mb-1 sm:mb-2 text-base sm:text-lg font-bold">Total Questions</h3>
              <p className="text-lg sm:text-xl">10</p>
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-gray-600 mb-1 sm:mb-2 text-base sm:text-lg font-bold">Coins</h3>
              <p className="text-lg sm:text-xl flex items-center">
                <span className="text-yellow-500 mr-1">●</span> 0
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 sm:gap-6 justify-center w-full max-w-md">
          <button 
            className="w-32 sm:w-40 py-2 sm:py-3 border border-indigo-600 text-indigo-600 rounded-md font-medium text-sm sm:text-base"
            onClick={() => navigate('/')}
          >
            Back
          </button>
          
          <button 
            className="w-32 sm:w-40 py-2 sm:py-3 bg-indigo-600 text-white rounded-md font-medium text-sm sm:text-base"
            onClick={() => navigate('/quiz')}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage