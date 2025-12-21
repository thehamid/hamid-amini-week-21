import React from 'react';

const Button = ({ children, type = 'button', isLoading = false, ...rest }) => {
  return (
    <button
      type={type}
      className={`w-full h-14 bg-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl cursor-pointer focus:outline-none focus:shadow-outline transition-colors duration-300 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? 'در حال پردازش...' : children}
    </button>
  );
};

export default Button;