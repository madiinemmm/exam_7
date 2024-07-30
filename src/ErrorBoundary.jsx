import React from 'react';

const ErrorBoundary = ({ error }) => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Unexpected Application Error!</h1>
      <p className="mb-4">Oops! Something went wrong.</p>
      {error && <p className="text-red-500">{error.message}</p>}
      <button 
        onClick={() => window.location.reload()} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorBoundary;
