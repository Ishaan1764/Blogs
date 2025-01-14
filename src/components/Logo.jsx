import React from 'react';
import { PenTool } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 bg-gray-900 px-3 py-2 rounded-md shadow-md transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-center p-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 rounded-full">
        <PenTool className="w-5 h-5 text-gray-200" />
      </div>
      <span className="text-gray-200 text-xl font-bold tracking-wide">
        Blog
      </span>
    </div>
  );
};

export default Logo;
