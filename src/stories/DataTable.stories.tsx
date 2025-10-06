import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../components/DataTable';
import { ThemeProvider } from '../components/ThemeContext';
import type { Column } from '../components/DataTable';

// Sample data interfaces
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive' | 'pending';
  role: 'admin' | 'user' | 'moderator';
  lastLogin: string;
  avatar?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  featured: boolean;
}

// Sample data
const userData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 32,
    status: 'active',
    role: 'admin',
    lastLogin: '2024-01-15T10:30:00Z',
    avatar: '👨‍💼'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 28,
    status: 'active',
    role: 'user',
    lastLogin: '2024-01-14T15:45:00Z',
    avatar: '👩‍💻'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    age: 35,
    status: 'inactive',
    role: 'moderator',
    lastLogin: '2024-01-10T09:20:00Z',
    avatar: '👨‍🔧'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    age: 29,
    status: 'pending',
    role: 'user',
    lastLogin: '2024-01-16T14:10:00Z',
    avatar: '👩‍🎨'
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    age: 41,
    status: 'active',
    role: 'admin',
    lastLogin: '2024-01-16T11:00:00Z',
    avatar: '👨‍🚀'
  }
];

const productData: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 45,
    rating: 4.5,
    featured: true
  },
  {
    id: 'p2',
    name: 'Coffee Maker',
    category: 'Appliances',
    price: 89.99,
    stock: 23,
    rating: 4.2,
    featured: false
  },
  {
    id: 'p3',
    name: 'Running Shoes',
    category: 'Sports',
    price: 129.99,
    stock: 67,
    rating: 4.8,
    featured: true
  },
  {
    id: 'p4',
    name: 'Desk Lamp',
    category: 'Furniture',
    price: 45.99,
    stock: 12,
    rating: 4.1,
    featured: false
  }
];

// User table columns
const userColumns: Column<User>[] = [
  {
    key: 'avatar',
    title: '',
    dataIndex: 'avatar',
    render: (value) => (
      <div className="text-2xl">{value || '👤'}</div>
    )
  },
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
    render: (value, record) => (
      <div>
        <div className="font-medium text-gray-900 dark:text-gray-100">{value}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{record.email}</div>
      </div>
    )
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (value) => {
      const statusConfig = {
        active: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200', dot: 'bg-green-400' },
        inactive: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200', dot: 'bg-red-400' },
        pending: { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-200', dot: 'bg-yellow-400' }
      };
      const config = statusConfig[value as keyof typeof statusConfig];
      
      return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
          <div className={`w-2 h-2 rounded-full mr-1.5 ${config.dot}`}></div>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </div>
      );
    }
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
    render: (value) => (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin',
    sortable: true,
    render: (value) => {
      const date = new Date(value);
      return (
        <div className="text-sm">
          <div className="text-gray-900 dark:text-gray-100">{date.toLocaleDateString()}</div>
          <div className="text-gray-500 dark:text-gray-400">{date.toLocaleTimeString()}</div>
        </div>
      );
    }
  }
];

// Product table columns
const productColumns: Column<Product>[] = [
  {
    key: 'name',
    title: 'Product',
    dataIndex: 'name',
    sortable: true,
    render: (value, record) => (
      <div className="flex items-center">
        {record.featured && <span className="text-yellow-400 mr-2">⭐</span>}
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{record.category}</div>
        </div>
      </div>
    )
  },
  {
    key: 'price',
    title: 'Price',
    dataIndex: 'price',
    sortable: true,
    render: (value) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        ${value.toFixed(2)}
      </span>
    )
  },
  {
    key: 'stock',
    title: 'Stock',
    dataIndex: 'stock',
    sortable: true,
    render: (value) => {
      const isLow = value < 20;
      return (
        <span className={`font-medium ${
          isLow 
            ? 'text-red-600 dark:text-red-400' 
            : 'text-gray-900 dark:text-gray-100'
        }`}>
          {value} {isLow && '⚠️'}
        </span>
      );
    }
  },
  {
    key: 'rating',
    title: 'Rating',
    dataIndex: 'rating',
    sortable: true,
    render: (value) => (
      <div className="flex items-center">
        <span className="text-yellow-400 mr-1">★</span>
        <span className="font-medium text-gray-900 dark:text-gray-100">{value}</span>
      </div>
    )
  }
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible data table component with sorting, selection, loading states, and responsive design.'
      }
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    data: {
      description: 'Array of data objects to display in the table'
    },
    columns: {
      description: 'Array of column definitions'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading skeleton'
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes'
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when there is no data'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Basic table story
export const Default: Story = {
  args: {
    data: userData,
    columns: userColumns,
    loading: false,
    selectable: false
  }
};

// With selection enabled
export const WithSelection: Story = {
  args: {
    data: userData,
    columns: userColumns,
    selectable: true,
    onRowSelect: (selectedRows) => {
      console.log('Selected rows:', selectedRows);
    }
  }
};

// Loading state
export const Loading: Story = {
  args: {
    data: userData,
    columns: userColumns,
    loading: true
  }
};

// Empty state
export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: 'No users found. Try adjusting your search criteria.'
  }
};

// Product table example
export const ProductTable: Story = {
  args: {
    data: productData,
    columns: productColumns,
    selectable: true,
    onRowSelect: (selectedRows) => {
      console.log('Selected products:', selectedRows);
    }
  }
};

// Large dataset simulation
const generateLargeDataset = (count: number): User[] => {
  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank'];
  const surnames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Wilson', 'Davis', 'Miller', 'Garcia'];
  const statuses: User['status'][] = ['active', 'inactive', 'pending'];
  const roles: User['role'][] = ['admin', 'user', 'moderator'];
  const avatars = ['👨‍💼', '👩‍💻', '👨‍🔧', '👩‍🎨', '👨‍🚀', '👩‍🔬', '👨‍🎓', '👩‍⚕️'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]} ${surnames[i % surnames.length]}`,
    email: `user${i + 1}@example.com`,
    age: 20 + (i % 50),
    status: statuses[i % statuses.length],
    role: roles[i % roles.length],
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: avatars[i % avatars.length]
  }));
};

export const LargeDataset: Story = {
  args: {
    data: generateLargeDataset(100),
    columns: userColumns,
    selectable: true
  }
};

// Minimal columns
const minimalColumns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true }
];

export const MinimalColumns: Story = {
  args: {
    data: userData.slice(0, 3),
    columns: minimalColumns
  }
};

// Custom row key example
export const CustomRowKey: Story = {
  args: {
    data: userData,
    columns: userColumns,
    selectable: true,
    rowKey: (record) => `user-${record.id}`,
    onRowSelect: (selectedRows) => {
      console.log('Selected with custom keys:', selectedRows);
    }
  }
};

// Responsive showcase
export const ResponsiveShowcase: Story = {
  args: {
    data: userData,
    columns: userColumns,
    selectable: true,
    className: 'max-w-full'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
