import React from 'react';

const Progressing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Loading animation */}
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-red-500"></div>
      
      {/* "Please wait..." text */}
      <p className="mt-4 text-lg font-semibold text-gray-600">Please wait ....</p>
    </div>
  );
};

export default Progressing;
