import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900"></div>
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] animate-spin-slow">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-600 to-transparent opacity-20"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-500 to-transparent opacity-20"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
