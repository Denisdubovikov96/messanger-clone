import React from 'react'


const EmptyState = () => {
  return (
    <div
        className='px-4 py10 sm:px-6 Lg:px-8 h-full flex justify-center items-center bg-gray-100'
    >
        <div
         className='text-center items-center flex flex-col'
        >
            <h3
                className='mt-2 text-2xl font-semibold text-gray-900'
            >
                Start Chat
            </h3>
        </div>
    </div>
  )
}

export default EmptyState