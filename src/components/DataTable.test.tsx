import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataTable } from './DataTable';
import { ThemeProvider } from './ThemeContext';
import type { Column } from './DataTable';

// Test data interface
interface TestUser {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
}

// Test data
const testData: TestUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, status: 'active' },
];

// Test columns
const testColumns: Column<TestUser>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { 
    key: 'status', 
    title: 'Status', 
    dataIndex: 'status',
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  },
];

// Wrapper component with theme provider
const DataTableWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider defaultTheme="light">
    {children}
  </ThemeProvider>
);

describe('DataTable', () => {
  it('renders table with data', () => {
    render(
      <DataTableWrapper>
        <DataTable data={testData} columns={testColumns} />
      </DataTableWrapper>
    );

    // Check if table headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check if data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(
      <DataTableWrapper>
        <DataTable 
          data={[]} 
          columns={testColumns} 
          emptyMessage="No users found"
        />
      </DataTableWrapper>
    );

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <DataTableWrapper>
        <DataTable 
          data={testData} 
          columns={testColumns} 
          loading={true}
        />
      </DataTableWrapper>
    );

    // Loading skeleton should be present
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('handles column sorting', async () => {
    render(
      <DataTableWrapper>
        <DataTable data={testData} columns={testColumns} />
      </DataTableWrapper>
    );

    // Click on Name column header to sort
    const nameHeader = screen.getByText('Name').closest('th');
    expect(nameHeader).toBeInTheDocument();
    
    fireEvent.click(nameHeader!);

    // Wait for sort to apply and check order
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      // Skip header row (index 0)
      const firstDataRow = rows[1];
      expect(firstDataRow).toHaveTextContent('Bob Johnson');
    });

    // Click again to reverse sort
    fireEvent.click(nameHeader!);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      expect(firstDataRow).toHaveTextContent('John Doe');
    });
  });

  it('handles row selection', () => {
    const onRowSelect = vi.fn();
    
    render(
      <DataTableWrapper>
        <DataTable 
          data={testData} 
          columns={testColumns} 
          selectable={true}
          onRowSelect={onRowSelect}
        />
      </DataTableWrapper>
    );

    // Check if select all checkbox is present
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    expect(selectAllCheckbox).toBeInTheDocument();

    // Check if individual row checkboxes are present
    const rowCheckboxes = screen.getAllByLabelText(/Select row \d+/);
    expect(rowCheckboxes).toHaveLength(3);

    // Select first row
    fireEvent.click(rowCheckboxes[0]);

    expect(onRowSelect).toHaveBeenCalledWith([testData[0]]);

    // Select all rows
    fireEvent.click(selectAllCheckbox);

    expect(onRowSelect).toHaveBeenCalledWith(testData);
  });

  it('handles custom row key function', () => {
    const customRowKey = (record: TestUser) => `user-${record.id}`;
    
    render(
      <DataTableWrapper>
        <DataTable 
          data={testData} 
          columns={testColumns} 
          selectable={true}
          rowKey={customRowKey}
        />
      </DataTableWrapper>
    );

    // The component should render without errors
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders custom cell content with render function', () => {
    render(
      <DataTableWrapper>
        <DataTable data={testData} columns={testColumns} />
      </DataTableWrapper>
    );

    // Check if custom status rendering works
    const activeStatus = screen.getAllByText('active');
    const inactiveStatus = screen.getAllByText('inactive');
    
    expect(activeStatus.length).toBeGreaterThan(0);
    expect(inactiveStatus.length).toBeGreaterThan(0);
  });

  it('applies correct ARIA attributes', () => {
    render(
      <DataTableWrapper>
        <DataTable 
          data={testData} 
          columns={testColumns} 
          selectable={true}
        />
      </DataTableWrapper>
    );

    // Check table role
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByLabelText('Data table')).toBeInTheDocument();

    // Check column headers have correct attributes
    const nameHeader = screen.getByText('Name').closest('th');
    expect(nameHeader).toHaveAttribute('aria-sort', 'none');

    // Check row selection attributes
    const dataRows = screen.getAllByRole('row').slice(1); // Skip header
    dataRows.forEach(row => {
      expect(row).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('shows selection count in footer', () => {
    render(
      <DataTableWrapper>
        <DataTable 
          data={testData} 
          columns={testColumns} 
          selectable={true}
        />
      </DataTableWrapper>
    );

    // Select first row
    const rowCheckboxes = screen.getAllByLabelText(/Select row \d+/);
    fireEvent.click(rowCheckboxes[0]);

    // Check selection count
    expect(screen.getByText('1 of 3 rows selected')).toBeInTheDocument();
  });

  it('handles sorting with null values', () => {
    const dataWithNulls: TestUser[] = [
      { id: 1, name: 'John', email: 'john@example.com', age: 30, status: 'active' },
      { id: 2, name: '', email: 'jane@example.com', age: 25, status: 'inactive' },
      { id: 3, name: 'Bob', email: '', age: 35, status: 'active' },
    ];

    render(
      <DataTableWrapper>
        <DataTable data={dataWithNulls} columns={testColumns} />
      </DataTableWrapper>
    );

    // Click on Name column to sort
    const nameHeader = screen.getByText('Name').closest('th');
    fireEvent.click(nameHeader!);

    // Component should handle null/empty values without crashing
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('supports responsive design classes', () => {
    render(
      <DataTableWrapper>
        <DataTable 
          data={testData} 
          columns={testColumns} 
          className="custom-table-class"
        />
      </DataTableWrapper>
    );

    const tableContainer = document.querySelector('.custom-table-class');
    expect(tableContainer).toBeInTheDocument();
    
    // Check for overflow-x-auto class for horizontal scrolling
    const scrollContainer = document.querySelector('.overflow-x-auto');
    expect(scrollContainer).toBeInTheDocument();
  });
});
