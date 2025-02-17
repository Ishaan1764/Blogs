import React from 'react';

const Container = ({ children }) => {
  return (
    <div className=" flex flex-col flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
