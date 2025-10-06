import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input field component with validation states, multiple variants, and modern design patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input field',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Color theme of the input field',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
      description: 'HTML input type',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Whether the input is in an invalid state',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the input is in a loading state',
    },
    showClearButton: {
      control: { type: 'boolean' },
      description: 'Whether to show the clear button',
    },
    showPasswordToggle: {
      control: { type: 'boolean' },
      description: 'Whether to show the password toggle button',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// Wrapper component for controlled stories
const ControlledInputField = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
};

// Basic stories
export const Default: Story = {
  render: ControlledInputField,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We\'ll never share your email with anyone else.',
  },
};

export const WithValue: Story = {
  render: ControlledInputField,
  args: {
    label: 'Username',
    value: 'john_doe',
    placeholder: 'Enter username',
  },
};

export const Required: Story = {
  render: ControlledInputField,
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    helperText: 'This field is required',
  },
};

// State stories
export const Invalid: Story = {
  render: ControlledInputField,
  args: {
    label: 'Email',
    value: 'invalid-email',
    placeholder: 'Enter your email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  render: ControlledInputField,
  args: {
    label: 'Disabled Field',
    value: 'This field is disabled',
    disabled: true,
    helperText: 'This field cannot be edited',
  },
};

export const Loading: Story = {
  render: ControlledInputField,
  args: {
    label: 'Search',
    placeholder: 'Searching...',
    loading: true,
    helperText: 'Please wait while we search',
  },
};

// Variant stories
export const Filled: Story = {
  render: ControlledInputField,
  args: {
    label: 'Filled Variant',
    placeholder: 'Type something...',
    variant: 'filled',
    helperText: 'This is a filled input variant',
  },
};

export const Outlined: Story = {
  render: ControlledInputField,
  args: {
    label: 'Outlined Variant',
    placeholder: 'Type something...',
    variant: 'outlined',
    helperText: 'This is an outlined input variant',
  },
};

export const Ghost: Story = {
  render: ControlledInputField,
  args: {
    label: 'Ghost Variant',
    placeholder: 'Type something...',
    variant: 'ghost',
    helperText: 'This is a ghost input variant',
  },
};

// Size stories
export const Small: Story = {
  render: ControlledInputField,
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
    helperText: 'This is a small input field',
  },
};

export const Medium: Story = {
  render: ControlledInputField,
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size',
    size: 'md',
    helperText: 'This is a medium input field',
  },
};

export const Large: Story = {
  render: ControlledInputField,
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
    helperText: 'This is a large input field',
  },
};

// Optional features
export const WithClearButton: Story = {
  render: ControlledInputField,
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    showClearButton: true,
    helperText: 'Click the X button to clear the field',
  },
};

export const PasswordField: Story = {
  render: ControlledInputField,
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
    helperText: 'Click the eye icon to toggle password visibility',
  },
};

export const PasswordWithClear: Story = {
  render: ControlledInputField,
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
    showClearButton: true,
    helperText: 'Password field with both toggle and clear buttons',
  },
};

// Theme stories
export const DarkTheme: Story = {
  render: ControlledInputField,
  args: {
    label: 'Dark Theme Input',
    placeholder: 'Type something...',
    theme: 'dark',
    helperText: 'This input uses the dark theme',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const DarkThemeInvalid: Story = {
  render: ControlledInputField,
  args: {
    label: 'Email',
    value: 'invalid-email',
    placeholder: 'Enter your email',
    theme: 'dark',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Complex examples
export const ComplexForm: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const emailInvalid = email && !email.includes('@');
    const passwordInvalid = password && password.length < 8;
    const confirmPasswordInvalid = confirmPassword && confirmPassword !== password;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          showClearButton
          invalid={emailInvalid}
          errorMessage={emailInvalid ? 'Please enter a valid email address' : undefined}
          helperText={!emailInvalid ? 'We\'ll use this to send you updates' : undefined}
          required
        />
        
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          showPasswordToggle
          showClearButton
          invalid={passwordInvalid}
          errorMessage={passwordInvalid ? 'Password must be at least 8 characters' : undefined}
          helperText={!passwordInvalid ? 'Use at least 8 characters' : undefined}
          required
        />
        
        <InputField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          showPasswordToggle
          invalid={confirmPasswordInvalid}
          errorMessage={confirmPasswordInvalid ? 'Passwords do not match' : undefined}
          required
        />
        
        <InputField
          label="Loading Example"
          placeholder="Submitting..."
          loading={loading}
          disabled={loading}
          helperText="This shows the loading state"
        />
        
        <button 
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Test Loading State
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A complex form example showing multiple input fields with different states and validations.',
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', width: '800px' }}>
      {(['filled', 'outlined', 'ghost'] as const).map((variant) => 
        (['sm', 'md', 'lg'] as const).map((size) => (
          <ControlledInputField
            key={`${variant}-${size}`}
            label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} ${size.toUpperCase()}`}
            placeholder={`${variant} ${size}`}
            variant={variant}
            size={size}
            helperText={`${variant} variant, ${size} size`}
          />
        ))
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all variant and size combinations.',
      },
    },
  },
};