import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = '' 
}) {
  const baseStyles = 'px-6 py-2.5 rounded font-medium text-sm transition-colors duration-200 focus:outline-none';
  
  // Đổi các class màu tĩnh (bg-black) sang các token màu `brand` ta vừa cấu hình
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-hover shadow-sm',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-brand-light hover:text-brand-dark hover:border-brand-primary',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}