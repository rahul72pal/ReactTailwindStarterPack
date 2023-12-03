import React from 'react'

const Error = () => {
  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:404 NOT FOUND</strong>
        <span className="block sm:inline"> Something went wrong.</span>
      </div>
    </div>
  )
}

export default Error
