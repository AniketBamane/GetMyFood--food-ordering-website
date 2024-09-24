import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">GetMyFood</h1>
        <p className="text-lg text-gray-600 mb-8">Delicious food, just a click away!</p>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center mb-4">
          <svg className="animate-spin h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div>

        {/* Loading Text */}
        <p className="text-lg text-gray-700">Please wait, starting application...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
