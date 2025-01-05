import React from 'react';

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-600 to-red-400">
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="relative w-32 h-32 border-8 border-white rounded-full animate-spin">
          <div className="absolute w-1 h-10 bg-white origin-bottom left-1/2 transform -translate-x-1/2 bottom-1/2 animate-spin-slow"></div>
          <div className="absolute w-1 h-14 bg-white origin-bottom left-1/2 transform -translate-x-1/2 bottom-1/2"></div>
        </div>

        <p className="mt-4 text-white text-xl font-semibold animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
