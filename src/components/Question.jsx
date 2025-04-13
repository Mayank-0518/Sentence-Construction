import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWord, unselectWord } from '../redux/features/questionsSlice';

function Question() {
  const dispatch = useDispatch();
  
  const { questions, currentQuestionIndex, userSelections } = useSelector(state => state.questions);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const questionParts = useMemo(() => {
    if (!currentQuestion) return [];
    return currentQuestion.question.split("_____________");
  }, [currentQuestion]);
  
  const availableOptions = useMemo(() => {
    if (!currentQuestion) return [];
    
    //filtering out the selected options
    const selectedWords = userSelections
      .filter(selection => selection.questionIndex === currentQuestionIndex)
      .map(selection => selection.word);
    
      //returning the remaining options
    return currentQuestion.options.filter(option => !selectedWords.includes(option));
    
  }, [currentQuestion, userSelections, currentQuestionIndex]);
  
  const handleSelectWord = (word) => {
    const filledBlankIndices = userSelections
      .filter(selection => selection.questionIndex === currentQuestionIndex)
      .map(selection => selection.blankIndex);
    
    // finding the first blank that hasn't been filled and dispatching selectWord 
    for (let i = 0; i < questionParts.length - 1; i++) {
      if (!filledBlankIndices.includes(i)) {
        dispatch(selectWord({ word, blankIndex: i }));
        break;
      }
    }
  };
  

  const handleUnselectWord = (blankIndex) => {
    dispatch(unselectWord({ blankIndex }));
  };
  
  // Render the question with blanks
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    return (
      <div className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-loose">
        {questionParts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < questionParts.length - 1 && (
              <span className="inline-block mx-1" style={{ width: '60px', verticalAlign: 'bottom' }}>
                {/* rendering the selected word from userselections on blanks (if present shows the word else blank) */}
                {userSelections.some(s => s.blankIndex === index && s.questionIndex === currentQuestionIndex) ? (
                  <div className="inline-block relative" style={{ width: '100%' }}>
                    <button 
                      onClick={() => handleUnselectWord(index)}
                      className="px-1 py-0.5 text-xs sm:text-sm border border-gray-300 rounded mb-1"
                    >
                      {userSelections.find(s => s.blankIndex === index && s.questionIndex === currentQuestionIndex)?.word}
                    </button>
                    <div className="border-b-2 border-gray-400 absolute bottom-0 left-0 right-0"></div>
                  </div>
                ) : (
                  <div className="inline-block relative" style={{ width: '100%' }}>
                    <div className="border-b-2 border-gray-400 absolute bottom-0 left-0 right-0"></div>
                    <div style={{ height: '14px' }}></div> 
                  </div>
                )}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  
  return (
    <div className='flex flex-col items-center justify-center px-2 sm:px-3 md:px-6 py-3 sm:py-4 md:py-6 min-h-[40vh] w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md'>
      <h2 className="text-sm sm:text-base md:text-lg font-medium mb-3 sm:mb-4 md:mb-8 text-center">Select the missing words in the correct order</h2>
      
      <div className="w-full px-1 sm:px-2 md:px-4 space-y-3 sm:space-y-4 md:space-y-6">
        {renderQuestion()}
      </div>
      
      <div className='mt-4 sm:mt-6 md:mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2'>
        {availableOptions.map((option, index) => (
          <button 
            key={index}
            onClick={() => handleSelectWord(option)}
            className="px-1.5 sm:px-2 md:px-3 py-0.5 text-xs sm:text-sm border border-gray-400 rounded"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;