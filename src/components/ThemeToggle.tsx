import React from 'react';
import { useTheme } from './ThemeContext';

export interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'md',
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-10 h-6 p-0.5',
    md: 'w-12 h-7 p-0.5',
    lg: 'w-14 h-8 p-1',
  };

  const thumbClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        relative inline-flex items-center
        rounded-full border-2 border-transparent
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transform hover:scale-105 active:scale-95
        ${theme === 'light' 
          ? 'bg-gray-300 hover:bg-gray-400 focus:ring-gray-500' 
          : 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500'
        }
        ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* Toggle Switch Track */}
      <span className="sr-only">Toggle theme</span>
      
      {/* Toggle Switch Thumb */}
      <span
        className={`
          ${thumbClasses[size]}
          inline-block rounded-full
          bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          flex items-center justify-center
          ${theme === 'light' 
            ? 'translate-x-0' 
            : `translate-x-full`
          }
        `}
      >
        {/* Icon inside the thumb */}
        {theme === 'light' ? (
          <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </span>
    </button>
  );
};
