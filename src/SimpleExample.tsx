import React, { useState } from 'react';
import { ThemeProvider, ThemedInputField, DataTable } from './components';
import type { Column } from './components';

// Example data interface
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive';
  createdAt: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'moderator',
    status: 'inactive',
    createdAt: '2024-01-10'
  }
];

// Table columns configuration
const userColumns: Column<User>[] = [
  {
    key: 'name',
    title: 'Full Name',
    dataIndex: 'name',
    sortable: true
  },
  {
    key: 'email',
    title: 'Email Address',
    dataIndex: 'email',
    sortable: true
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    render: (value) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value === 'admin'
          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
          : value === 'moderator'
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (value) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value === 'active'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          value === 'active' ? 'bg-green-400' : 'bg-red-400'
        }`}></div>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )
  },
  {
    key: 'createdAt',
    title: 'Created',
    dataIndex: 'createdAt',
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString()
  }
];

// Simple usage example component
export const SimpleExample: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Table state
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (field: keyof typeof formData) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', password: '' });
  };

  // Simulate loading
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Component Library Example
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Simple demonstration of InputField and DataTable components
          </p>
        </div>

        {/* InputField Example */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            InputField Component Example
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <ThemedInputField
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange('name')}
              showClearButton
              helperText="This will be displayed publicly"
            />

            <ThemedInputField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange('email')}
              showClearButton
              helperText="We'll never share your email"
            />

            <ThemedInputField
              label="Password"
              type="password"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleInputChange('password')}
              showPasswordToggle
              showClearButton
              helperText="Must be at least 8 characters"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Submit Form
            </button>
          </form>
        </div>

        {/* DataTable Example */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                DataTable Component Example
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Interactive table with sorting and selection
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {selectedUsers.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected: {' '}
                {selectedUsers.map(user => user.name).join(', ')}
              </p>
            </div>
          )}

          <DataTable
            data={sampleUsers}
            columns={userColumns}
            loading={isLoading}
            selectable={true}
            onRowSelect={setSelectedUsers}
            emptyMessage="No users found. Try refreshing the data."
          />
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How to Use These Components
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                InputField Features:
              </h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Multiple variants (filled, outlined, ghost)</li>
                <li>• Different sizes (sm, md, lg)</li>
                <li>• Password toggle and clear buttons</li>
                <li>• Loading and error states</li>
                <li>• Full TypeScript support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                DataTable Features:
              </h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Column sorting (click headers)</li>
                <li>• Row selection with checkboxes</li>
                <li>• Custom cell rendering</li>
                <li>• Loading and empty states</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example with theme provider wrapper
export const ExampleApp: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <SimpleExample />
    </ThemeProvider>
  );
};

export default ExampleApp;
