import React from 'react'

function ProgressBar({ total, current }) {
  return (
    <div className="flex gap-1 w-full mb-4 sm:mb-6">
      {[...Array(total)].map((_, index) => (
        <div 
          key={index} 
          className={`h-1.5 sm:h-2 flex-grow rounded-full ${
            index < current ? 'bg-amber-400' : 'bg-gray-200'
          }`}
        ></div>
      ))}
    </div>
  )
}

export default ProgressBar