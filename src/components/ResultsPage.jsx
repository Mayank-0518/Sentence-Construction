import React from 'react'
import { useSelector } from 'react-redux'

function ResultsPage({ onGoToDashboard }) {
  const { questions, userSelections } = useSelector(state => state.questions)
  
  const calculateScore = () => {
    let score = 0;
    
    questions.forEach((question, questionIndex) => {
      const userAnswersForQuestion = userSelections.filter(
        selection => selection.questionIndex === questionIndex
      );
      
      const correctAnswers = question.correctAnswer;
      let allCorrect = true;
      
      const questionParts = question.question.split("_____________");
      const blankCount = questionParts.length - 1;
      
      if (userAnswersForQuestion.length !== blankCount) {
        allCorrect = false;
      } else {
        for (let i = 0; i < blankCount; i++) {
          const userAnswer = userAnswersForQuestion.find(a => a.blankIndex === i)?.word;
          if (userAnswer !== correctAnswers[i]) {
            allCorrect = false;
            break;
          }
        }
      }
      
      if (allCorrect) score++;
    });
    
    return score;
  };
  
  const score = calculateScore();
  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  const getMessage = () => {
    if (percentage >= 80) {
      return "Excellent work! Your command of sentence construction is outstanding!";
    } else if (percentage >= 60) {
      return "Good job! You have a solid understanding of sentence construction.";
    } else if (percentage >= 40) {
      return "You're off to a good start. With a bit more practice, your skills will sharpen up in no time. Keep going, you're on the right track!";
    } else {
      return "Practice makes perfect! Keep working on your sentence construction skills.";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center p-3 sm:p-4 bg-gray-100">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center justify-center my-6 sm:my-8">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#e0e0e0" 
                strokeWidth="6" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#e53e3e" 
                strokeWidth="6" 
                strokeDasharray={`${percentage * 2.83} 283`} 
                strokeDashoffset="0" 
                transform="rotate(-90 50 50)" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-bold text-red-600">{score}</span>
              <span className="text-xs sm:text-sm text-red-500">Overall Score</span>
            </div>
          </div>
        </div>
        
        <p className="text-center text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 px-4">
          {getMessage()}
        </p>
        
        <div className="flex justify-center mb-6 sm:mb-8">
          <button 
            onClick={onGoToDashboard}
            className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md"
          >
            Go to Dashboard
          </button>
        </div>
        
        <div className="mt-6 sm:mt-8 px-2 sm:px-0">
          <h2 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Question Review</h2>
          
          {questions.map((question, qIndex) => {
            const questionParts = question.question.split("_____________");
            const userAnswersForQuestion = userSelections.filter(
              selection => selection.questionIndex === qIndex
            );
            
            const correctAnswers = question.correctAnswer;
            let allCorrect = true;
            
            const blankCount = questionParts.length - 1;
            
            if (userAnswersForQuestion.length !== blankCount) {
              allCorrect = false;
            } else {
              for (let i = 0; i < blankCount; i++) {
                const userAnswer = userAnswersForQuestion.find(a => a.blankIndex === i)?.word;
                if (userAnswer !== correctAnswers[i]) {
                  allCorrect = false;
                  break;
                }
              }
            }
            
            return (
              <div key={qIndex} className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <h3 className="text-sm sm:text-md font-medium text-gray-600">Prompt</h3>
                  <span className="text-xs sm:text-sm text-gray-500">{qIndex + 1}/{totalQuestions}</span>
                </div>
                
                <div className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                  {questionParts.map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < questionParts.length - 1 && (
                        <span className="underline italic font-medium">
                          {correctAnswers[index]}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Your response <span className={allCorrect ? "text-green-600" : "text-red-600"}>
                    {allCorrect ? "Correct" : "Incorrect"}
                  </span></div>
                  
                  <div className="text-xs sm:text-sm md:text-base text-gray-700">
                    {questionParts.map((part, index) => (
                      <React.Fragment key={`user-${index}`}>
                        {part}
                        {index < questionParts.length - 1 && (
                          <span className={`underline ${
                            userAnswersForQuestion.find(a => a.blankIndex === index)?.word === correctAnswers[index] 
                              ? "text-green-600" 
                              : "text-red-600"
                          } italic font-medium`}>
                            {userAnswersForQuestion.find(a => a.blankIndex === index)?.word || "_______"}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;