import React, { useState, forwardRef, useId } from 'react';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  // Basic props
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  
  // State props
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  required?: boolean;
  
  // Variant and size props
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  
  // Optional features
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  onClear?: () => void;
  
  // Additional props
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  required = false,
  variant = 'outlined',
  size = 'md',
  theme = 'light',
  showClearButton = false,
  showPasswordToggle = false,
  onClear,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();
  const helperId = useId();
  const errorId = useId();

  const actualType = type === 'password' && showPassword ? 'text' : type;
  const hasValue = value && value.length > 0;
  const showError = invalid && errorMessage;
  const showHelper = !showError && helperText;

  // Theme classes
  const themeClasses = {
    light: {
      container: 'text-gray-900',
      label: 'text-gray-700',
      input: 'text-gray-900 placeholder-gray-500',
      helperText: 'text-gray-600',
      errorText: 'text-red-600',
      icon: 'text-gray-400 hover:text-gray-600',
    },
    dark: {
      container: 'text-gray-100',
      label: 'text-gray-300',
      input: 'text-gray-100 placeholder-gray-400',
      helperText: 'text-gray-400',
      errorText: 'text-red-400',
      icon: 'text-gray-500 hover:text-gray-300',
    },
  };

  // Size classes
  const sizeClasses = {
    sm: {
      input: 'h-8 px-3 text-sm',
      label: 'text-sm',
      helperText: 'text-xs',
      icon: 'w-4 h-4',
    },
    md: {
      input: 'h-10 px-3 text-base',
      label: 'text-sm',
      helperText: 'text-sm',
      icon: 'w-5 h-5',
    },
    lg: {
      input: 'h-12 px-4 text-lg',
      label: 'text-base',
      helperText: 'text-base',
      icon: 'w-6 h-6',
    },
  };

  // Enhanced variant classes with modern design
  const getVariantClasses = () => {
    const baseClasses = 'border-2 transition-all duration-300 ease-in-out rounded-xl backdrop-blur-sm';
    const isDark = theme === 'dark';
    
    switch (variant) {
      case 'filled':
        return `${baseClasses} border-transparent ${
          isDark 
            ? 'bg-gray-800/60 hover:bg-gray-800/80 focus:bg-gray-800/90' 
            : 'bg-gray-50/80 hover:bg-gray-100/80 focus:bg-gray-100/90'
        } ${
          isFocused 
            ? isDark 
              ? 'shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/50 border-blue-500/50' 
              : 'shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/50 border-blue-500/50'
            : 'hover:shadow-md'
        } ${
          invalid 
            ? isDark 
              ? 'bg-red-900/20 shadow-lg shadow-red-500/20 ring-2 ring-red-500/50 border-red-500' 
              : 'bg-red-50/80 shadow-lg shadow-red-500/20 ring-2 ring-red-500/50 border-red-500'
            : ''
        } ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`;
      
      case 'ghost':
        return `${baseClasses} border-transparent ${
          isDark ? 'bg-transparent hover:bg-gray-800/30' : 'bg-transparent hover:bg-gray-50/50'
        } ${
          isFocused 
            ? isDark 
              ? 'border-blue-500/50 bg-gray-800/40 shadow-lg shadow-blue-500/10' 
              : 'border-blue-500/50 bg-white/60 shadow-lg shadow-blue-500/10'
            : ''
        } ${
          invalid 
            ? isDark 
              ? 'border-red-500/50 bg-red-900/10 shadow-lg shadow-red-500/10' 
              : 'border-red-500/50 bg-red-50/30 shadow-lg shadow-red-500/10'
            : ''
        } ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`;
      
      case 'outlined':
      default:
        return `${baseClasses} ${
          isDark 
            ? 'border-gray-600/60 bg-gray-900/20 hover:border-gray-500/80' 
            : 'border-gray-300/60 bg-white/80 hover:border-gray-400/80'
        } ${
          isFocused 
            ? isDark 
              ? 'border-blue-500 shadow-lg shadow-blue-500/20 bg-gray-900/40' 
              : 'border-blue-500 shadow-lg shadow-blue-500/20 bg-white'
            : 'hover:shadow-md'
        } ${
          invalid 
            ? isDark 
              ? 'border-red-500 shadow-lg shadow-red-500/20 bg-red-900/10' 
              : 'border-red-500 shadow-lg shadow-red-500/20 bg-red-50/50'
            : ''
        } ${
          disabled ? 'opacity-60 cursor-not-allowed border-gray-200/40' : ''
        }`;
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative ${themeClasses[theme].container} ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={id}
          className={`block mb-1 font-medium ${sizeClasses[size].label} ${themeClasses[theme].label}`}
        >
          {label}
          {required && (
            <span className={`ml-1 ${invalid ? themeClasses[theme].errorText : 'text-red-500'}`}>
              *
            </span>
          )}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          aria-describedby={showError ? errorId : showHelper ? helperId : undefined}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full
            ${sizeClasses[size].input}
            ${getVariantClasses()}
            ${themeClasses[theme].input}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${loading ? 'pr-10' : ''}
            ${(showClearButton && hasValue) || (showPasswordToggle && type === 'password') ? 'pr-10' : ''}
            ${(showClearButton && hasValue) && (showPasswordToggle && type === 'password') ? 'pr-16' : ''}
            focus:outline-none
            disabled:cursor-not-allowed
          `}
          {...props}
        />

        {/* Loading Spinner with enhanced animation */}
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className={`animate-spin rounded-full border-2 border-gray-300/60 border-t-blue-500 ${sizeClasses[size].icon} drop-shadow-sm`}></div>
          </div>
        )}

        {/* Action Buttons Container */}
        {!loading && ((showClearButton && hasValue) || (showPasswordToggle && type === 'password')) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
            {/* Enhanced Clear Button */}
            {showClearButton && hasValue && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                className={`
                  ${sizeClasses[size].icon}
                  ${themeClasses[theme].icon}
                  hover:bg-gray-100/80 dark:hover:bg-gray-700/80
                  hover:scale-110 active:scale-95
                  rounded-full p-1 transition-all duration-200 ease-in-out
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1
                  shadow-sm hover:shadow-md
                `}
                aria-label="Clear input"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="transition-transform duration-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Enhanced Password Toggle Button */}
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={disabled}
                className={`
                  ${sizeClasses[size].icon}
                  ${themeClasses[theme].icon}
                  hover:bg-gray-100/80 dark:hover:bg-gray-700/80
                  hover:scale-110 active:scale-95
                  rounded-full p-1 transition-all duration-200 ease-in-out
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1
                  shadow-sm hover:shadow-md
                `}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <div className="transition-transform duration-300 ease-in-out">
                  {showPassword ? (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="transform transition-all duration-200">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="transform transition-all duration-200">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </div>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper Text or Error Message */}
      {(showHelper || showError) && (
        <div className={`mt-1 ${sizeClasses[size].helperText}`}>
          {showError && (
            <p id={errorId} className={`${themeClasses[theme].errorText} flex items-center`}>
              <svg className={`mr-1 ${sizeClasses[size].icon}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorMessage}
            </p>
          )}
          {showHelper && (
            <p id={helperId} className={themeClasses[theme].helperText}>
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';
