# React Component Library

A modern React component library built with TypeScript and Tailwind CSS, featuring InputField and DataTable components with dark mode support.

## 🌐 Live Demo

**🔗 [View Live Demo](https://uzence-project.vercel.app)**

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/Fuzaildev/uzence-project.git
cd uzence-project

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5175` to see the components in action.

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Components

### 1. InputField Component

A flexible input field component with multiple variants, states, and interactive features.

#### Features
- ✅ Multiple variants (filled, outlined, ghost)
- ✅ Different sizes (sm, md, lg)
- ✅ Password toggle functionality
- ✅ Clear button option
- ✅ Loading states
- ✅ Error handling with validation messages
- ✅ Dark/light theme support
- ✅ Full TypeScript support
- ✅ Accessibility compliant

#### Basic Usage

```tsx
import { ThemedInputField } from './components';

function App() {
  const [email, setEmail] = useState('');

  return (
    <ThemedInputField
      label="Email Address"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      showClearButton
      helperText="We'll never share your email."
    />
  );
}
```

#### Props Interface

```typescript
interface InputFieldProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
  showClearButton?: boolean;
  className?: string;
}
```

### 2. DataTable Component

A comprehensive data table component with sorting, selection, and responsive design.

#### Features
- ✅ Display tabular data with custom rendering
- ✅ Column sorting (ascending/descending)
- ✅ Row selection (single/multiple)
- ✅ Loading state with skeleton animation
- ✅ Empty state handling
- ✅ Responsive design
- ✅ Dark/light theme support
- ✅ Full accessibility (ARIA labels)
- ✅ TypeScript generics for type safety

#### Basic Usage

```tsx
import { DataTable } from './components';
import type { Column } from './components';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

function UserTable() {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  ];

  const columns: Column<User>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { 
      key: 'status', 
      title: 'Status', 
      dataIndex: 'status',
      render: (value) => (
        <span className={`px-2 py-1 rounded ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      selectable={true}
      onRowSelect={(selectedRows) => console.log('Selected:', selectedRows)}
    />
  );
}
```

#### Props Interface

```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  emptyMessage?: string;
  rowKey?: keyof T | ((record: T) => string | number);
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}
```

## 🎨 Theme Support

Both components support dark and light themes through the ThemeContext:

```tsx
import { ThemeProvider } from './components';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* Your components here */}
    </ThemeProvider>
  );
}
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:
- Horizontal scrolling for tables on mobile
- Adaptive spacing and typography
- Touch-friendly interactive elements

## ♿ Accessibility

Components follow WCAG guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## 🧪 Testing

Run the test suite:

```bash
npx vitest run
```

All components include comprehensive tests covering:
- Functionality testing
- Accessibility testing
- Edge cases and error handling
- User interaction scenarios

## 📖 Storybook

Explore components in Storybook:

```bash
npm run storybook
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook
- `npx vitest run` - Run tests

### Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Vitest** - Testing framework
- **Storybook** - Component documentation

## 📁 Project Structure

```
src/
├── components/
│   ├── DataTable.tsx          # DataTable component
│   ├── DataTable.test.tsx     # DataTable tests
│   ├── InputField.tsx         # Base InputField component
│   ├── ThemedInputField.tsx   # Themed InputField wrapper
│   ├── ThemeContext.tsx       # Theme provider and context
│   ├── ThemeToggle.tsx        # Theme toggle button
│   └── index.ts               # Component exports
├── stories/
│   ├── DataTable.stories.tsx  # DataTable Storybook stories
│   ├── InputField.stories.tsx # InputField Storybook stories
│   └── ThemeToggle.stories.tsx # ThemeToggle Storybook stories
└── App.tsx                    # Demo application
```

## 🎯 Features Summary

### InputField Component
- ✅ TypeScript with proper typing
- ✅ Multiple variants and sizes
- ✅ Interactive features (password toggle, clear button)
- ✅ Loading and error states
- ✅ Clean, modern styling
- ✅ Dark mode support
- ✅ Accessibility compliant
- ✅ Comprehensive tests

### DataTable Component
- ✅ TypeScript with proper typing
- ✅ Display tabular data
- ✅ Column sorting
- ✅ Row selection (single/multiple)
- ✅ Loading state
- ✅ Empty state
- ✅ Responsive design
- ✅ Basic accessibility (ARIA labels)
- ✅ Clean, modern styling
- ✅ Comprehensive tests

Both components are production-ready with full TypeScript support, comprehensive testing, and modern styling that adapts to dark/light themes.
