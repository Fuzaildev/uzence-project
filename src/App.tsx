

import React, { useState } from 'react';
import { ThemeProvider, useTheme, ThemedInputField, ThemeToggle, DataTable } from './components/index';
import type { Column } from './components/index';

// Demo component that uses the theme context
const ThemeDemo: React.FC = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for showcase examples
  const [filledInput, setFilledInput] = useState('');
  const [outlinedInput, setOutlinedInput] = useState('');
  const [ghostInput, setGhostInput] = useState('');
  const [smallInput, setSmallInput] = useState('');
  const [mediumInput, setMediumInput] = useState('');
  const [largeInput, setLargeInput] = useState('');
  
  // State for demo fields
  const [errorDemoInput, setErrorDemoInput] = useState('invalid-email');
  const [disabledDemoInput, setDisabledDemoInput] = useState('This field is disabled');

  // Sample data for DataTable demo
  interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
    status: 'active' | 'inactive';
    lastLogin: string;
  }

  const sampleUsers: User[] = [
    { id: 1, name: 'Arjun Sharma', email: 'arjun.sharma@example.com', role: 'admin', status: 'active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Priya Patel', email: 'priya.patel@example.com', role: 'user', status: 'active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', role: 'moderator', status: 'inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Ananya Singh', email: 'ananya.singh@example.com', role: 'user', status: 'active', lastLogin: '2024-01-16' },
  ];

  const userColumns: Column<User>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { 
      key: 'role', 
      title: 'Role', 
      dataIndex: 'role',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'admin' 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : value === 'moderator'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status', 
      dataIndex: 'status',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
  ];

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      {/* Enhanced background pattern with animation */}
      <div className="absolute inset-0 opacity-[0.02] animate-pulse">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating orbs for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20 animate-pulse ${
          theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'
        }`} style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className={`absolute top-40 right-20 w-24 h-24 rounded-full blur-3xl opacity-15 animate-pulse ${
          theme === 'dark' ? 'bg-purple-500' : 'bg-purple-400'
        }`} style={{ animationDelay: '2s', animationDuration: '6s' }} />
        <div className={`absolute bottom-32 left-1/4 w-20 h-20 rounded-full blur-3xl opacity-10 animate-pulse ${
          theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-400'
        }`} style={{ animationDelay: '4s', animationDuration: '5s' }} />
      </div>

      <div className="relative z-10">
        {/* Responsive Enhanced Header with Theme Toggle */}
        <div className={`backdrop-blur-xl border-b transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-900/60 border-gray-700/40 shadow-lg shadow-gray-900/20' 
            : 'bg-white/60 border-gray-200/40 shadow-lg shadow-gray-200/20'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Component Library
                </h1>
                <p className={`text-sm sm:text-base lg:text-lg ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  InputField & DataTable components with TypeScript & Tailwind CSS
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/60 text-gray-300 border border-gray-700/50' 
                    : 'bg-gray-100/60 text-gray-700 border border-gray-200/50'
                }`}>
                  <span className="hidden sm:inline">{theme === 'dark' ? '🌙 Dark' : '☀️ Light'} Mode</span>
                  <span className="sm:hidden">{theme === 'dark' ? '🌙' : '☀️'}</span>
                </div>
                <div className="transform hover:scale-110 transition-transform duration-200">
                  <ThemeToggle size="lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Main Content */}
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Responsive Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 ${
              theme === 'dark' 
                ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50' 
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}>
              ✨ InputField Component Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Flexible Input Components
            </h2>
            <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              A comprehensive InputField component with multiple variants, 
              states, and interactive features including dark mode support.
            </p>
          </div>

          {/* Responsive Demo Form */}
          <div className="max-w-2xl mx-auto px-4">
            <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl backdrop-blur-xl border transition-all duration-300 hover:shadow-2xl sm:hover:shadow-3xl transform hover:scale-[1.01] sm:hover:scale-[1.02] ${
              theme === 'dark' 
                ? 'bg-gray-800/40 border-gray-700/30 shadow-gray-900/30' 
                : 'bg-white/70 border-gray-200/30 shadow-gray-900/10'
            }`}>
              <div className="space-y-6 sm:space-y-8">
                {/* Responsive Form Header */}
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 ${
                    theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                  }`}>
                    <span className="text-2xl sm:text-3xl">✨</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Interactive Demo</h3>
                  <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Try the InputField component with all features
                  </p>
                </div>

                {/* Main Form Fields */}
                <div className="grid gap-6">
                  <ThemedInputField
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    showClearButton
                    helperText="We'll never share your email with anyone else."
                    size="lg"
                  />

                  <ThemedInputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    showPasswordToggle
                    showClearButton
                    helperText="Use at least 8 characters with a mix of letters and numbers."
                    size="lg"
                  />
                </div>

                {/* Responsive Enhanced Action Button */}
                <div className="flex justify-center pt-4">
                  <button className={`group px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl sm:shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl sm:shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40'
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/50 relative overflow-hidden`}>
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Get Started</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Feature Showcase */}
          <div className="mt-16 sm:mt-20">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Component Variants</h3>
              <p className={`text-sm sm:text-base lg:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Explore different styles and configurations
              </p>
            </div>

            {/* Responsive Variants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
              {/* Filled Variant */}
              <div className={`p-6 rounded-xl border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-white/50 border-gray-200/50'
              }`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                    theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
                  }`}>
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h4 className="text-xl font-semibold">Filled Variant</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Solid background style
                  </p>
                </div>
                <ThemedInputField
                  label="Filled Input"
                  variant="filled"
                  placeholder="Type something..."
                  helperText="This is a filled variant"
                  value={filledInput}
                  onChange={(e) => setFilledInput(e.target.value)}
                />
              </div>

              {/* Outlined Variant */}
              <div className={`p-6 rounded-xl border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-white/50 border-gray-200/50'
              }`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                    theme === 'dark' ? 'bg-green-900/50' : 'bg-green-100'
                  }`}>
                    <span className="text-2xl">📝</span>
                  </div>
                  <h4 className="text-xl font-semibold">Outlined Variant</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Classic border style
                  </p>
                </div>
                <ThemedInputField
                  label="Outlined Input"
                  variant="outlined"
                  placeholder="Type something..."
                  helperText="This is an outlined variant"
                  value={outlinedInput}
                  onChange={(e) => setOutlinedInput(e.target.value)}
                />
              </div>

              {/* Ghost Variant */}
              <div className={`p-6 rounded-xl border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-white/50 border-gray-200/50'
              }`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                    theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-100'
                  }`}>
                    <span className="text-2xl">👻</span>
                  </div>
                  <h4 className="text-xl font-semibold">Ghost Variant</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Minimal transparent style
                  </p>
                </div>
                <ThemedInputField
                  label="Ghost Input"
                  variant="ghost"
                  placeholder="Type something..."
                  helperText="This is a ghost variant"
                  value={ghostInput}
                  onChange={(e) => setGhostInput(e.target.value)}
                />
              </div>
            </div>

            {/* Responsive Size Showcase */}
            <div className={`p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border transition-all duration-300 mx-4 ${
              theme === 'dark' 
                ? 'bg-gray-800/30 border-gray-700/50' 
                : 'bg-white/50 border-gray-200/50'
            }`}>
              <div className="text-center mb-6 sm:mb-8">
                <h4 className="text-xl sm:text-2xl font-semibold mb-2">Different Sizes</h4>
                <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Small, medium, and large input sizes
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <ThemedInputField
                    label="Small Size"
                    size="sm"
                    placeholder="Small input"
                    helperText="Compact size"
                    value={smallInput}
                    onChange={(e) => setSmallInput(e.target.value)}
                  />
                </div>
                <div>
                  <ThemedInputField
                    label="Medium Size"
                    size="md"
                    placeholder="Medium input"
                    helperText="Default size"
                    value={mediumInput}
                    onChange={(e) => setMediumInput(e.target.value)}
                  />
                </div>
                <div>
                  <ThemedInputField
                    label="Large Size"
                    size="lg"
                    placeholder="Large input"
                    helperText="Spacious size"
                    value={largeInput}
                    onChange={(e) => setLargeInput(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Responsive States Showcase */}
            <div className="mt-12 sm:mt-16 px-4">
              <div className="text-center mb-6 sm:mb-8">
                <h4 className="text-xl sm:text-2xl font-semibold mb-2">Input States</h4>
                <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Error, disabled, and loading states
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className={`p-6 rounded-xl border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-red-900/10 border-red-700/30' 
                    : 'bg-red-50/50 border-red-200/50'
                }`}>
                  <div className="text-center mb-4">
                    <span className="text-2xl">❌</span>
                    <h5 className="font-semibold mt-2">Error State</h5>
                  </div>
                  <ThemedInputField
                    label="Email"
                    value={errorDemoInput}
                    onChange={(e) => setErrorDemoInput(e.target.value)}
                    invalid={true}
                    errorMessage="Please enter a valid email address"
                    placeholder="Enter your email"
                    readOnly
                  />
                </div>

                <div className={`p-6 rounded-xl border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/30 border-gray-700/50' 
                    : 'bg-gray-50/50 border-gray-200/50'
                }`}>
                  <div className="text-center mb-4">
                    <span className="text-2xl">🔒</span>
                    <h5 className="font-semibold mt-2">Disabled State</h5>
                  </div>
                  <ThemedInputField
                    label="Disabled Field"
                    value={disabledDemoInput}
                    onChange={(e) => setDisabledDemoInput(e.target.value)}
                    disabled={true}
                    helperText="This field cannot be edited"
                    readOnly
                  />
                </div>

                <div className={`p-6 rounded-xl border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-blue-900/10 border-blue-700/30' 
                    : 'bg-blue-50/50 border-blue-200/50'
                }`}>
                  <div className="text-center mb-4">
                    <span className="text-2xl">⏳</span>
                    <h5 className="font-semibold mt-2">Loading State</h5>
                  </div>
                  <ThemedInputField
                    label="Loading Field"
                    placeholder="Processing..."
                    loading={true}
                    helperText="Please wait while we process"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Responsive DataTable Showcase */}
          <div className="mt-16 sm:mt-20">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <div className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 ${
                theme === 'dark' 
                  ? 'bg-green-900/30 text-green-300 border border-green-700/50' 
                  : 'bg-green-100 text-green-800 border border-green-200'
              }`}>
                📊 DataTable Component Showcase
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Interactive Data Table</h3>
              <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                A comprehensive DataTable component with sorting, selection, loading states, and responsive design.
              </p>
            </div>

            {/* Responsive Enhanced DataTable Demo */}
            <div className="max-w-7xl mx-auto px-4">
              <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl backdrop-blur-xl border transition-all duration-300 hover:shadow-2xl sm:hover:shadow-3xl ${
                theme === 'dark' 
                  ? 'bg-gray-800/40 border-gray-700/30 shadow-gray-900/30' 
                  : 'bg-white/70 border-gray-200/30 shadow-gray-900/10'
              }`}>
                <div className="mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 mb-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${
                        theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'
                      }`}>
                        <span className="text-xl sm:text-2xl">📊</span>
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-semibold">User Management Table</h4>
                        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Click column headers to sort, use checkboxes to select rows
                        </p>
                      </div>
                    </div>
                    {selectedUsers.length > 0 && (
                      <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl backdrop-blur-sm border ${
                        theme === 'dark' 
                          ? 'bg-blue-500/20 border-blue-500/30 text-blue-300' 
                          : 'bg-blue-100/80 border-blue-200/50 text-blue-700'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-xs sm:text-sm font-medium">
                            {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  <DataTable
                    data={sampleUsers}
                    columns={userColumns}
                    selectable={true}
                    onRowSelect={setSelectedUsers}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Responsive Footer */}
        <footer className={`mt-16 sm:mt-20 border-t transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-900/50 border-gray-700/50' 
            : 'bg-white/50 border-gray-200/50'
        } backdrop-blur-sm`}>
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="text-center">
              <p className={`text-base sm:text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Built with React, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Main App component with Theme Provider
export const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <ThemeDemo />
    </ThemeProvider>
  );
};

export default App;
