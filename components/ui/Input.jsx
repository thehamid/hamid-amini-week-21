import React from 'react';

const Input = ({ label, name, type = 'text', error, ...rest }) => {
  return (
    <div className="mb-4">
       <input
        id={name}
        name={name}
        type={type}
        placeholder={label}
        className={`rounded-xl w-full h-14 py-5 px-4 bg-secondary text-zinc-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? 'border-red-500' : ''
        }`}
        {...rest} 
      />
      {error && (
        <p className="text-red-500 text-xs italic mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;