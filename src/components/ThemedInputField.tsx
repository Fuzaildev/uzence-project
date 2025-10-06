import { forwardRef } from 'react';
import { InputField as BaseInputField } from './InputField';
import type { InputFieldProps as BaseInputFieldProps } from './InputField';
import { useTheme } from './ThemeContext';

export interface ThemedInputFieldProps extends Omit<BaseInputFieldProps, 'theme'> {
  theme?: 'light' | 'dark' | 'auto';
}

export const ThemedInputField = forwardRef<HTMLInputElement, ThemedInputFieldProps>(({
  theme = 'auto',
  ...props
}, ref) => {
  const { theme: contextTheme } = useTheme();
  
  const actualTheme = theme === 'auto' ? contextTheme : theme;
  
  return (
    <BaseInputField
      ref={ref}
      theme={actualTheme}
      {...props}
    />
  );
});

ThemedInputField.displayName = 'ThemedInputField';
