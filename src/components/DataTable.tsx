import React, { useState, useMemo } from 'react';
import { useTheme } from './ThemeContext';

// Type definitions
export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  emptyMessage?: string;
  rowKey?: keyof T | ((record: T) => string | number);
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

// Sort icon components with smooth animations
const SortIcon: React.FC<{ direction: SortDirection; active: boolean }> = ({ direction, active }) => {
  const { theme } = useTheme();
  
  if (!active) {
    return (
      <div className="relative ml-2 opacity-0 group-hover:opacity-60 transition-opacity duration-200">
        <svg 
          className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative ml-2 transition-all duration-200">
      <svg 
        className={`w-4 h-4 transition-all duration-200 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} ${
          direction === 'asc' ? 'rotate-0' : 'rotate-180'
        }`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </div>
  );
};

// Enhanced loading skeleton with staggered animation
const LoadingSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="flex items-center space-x-4 py-3 px-1"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className={`h-5 w-5 rounded-md animate-pulse ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} 
               style={{ animationDelay: `${i * 150}ms` }} />
          <div className="flex-1 space-y-2">
            <div className={`h-4 rounded-md animate-pulse ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
                 style={{ width: `${Math.random() * 40 + 60}%`, animationDelay: `${i * 200}ms` }} />
            <div className={`h-3 rounded-md animate-pulse ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'}`}
                 style={{ width: `${Math.random() * 30 + 40}%`, animationDelay: `${i * 250}ms` }} />
          </div>
          <div className={`h-4 w-20 rounded-md animate-pulse ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
               style={{ animationDelay: `${i * 300}ms` }} />
          <div className={`h-4 w-24 rounded-md animate-pulse ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
               style={{ animationDelay: `${i * 350}ms` }} />
        </div>
      ))}
    </div>
  );
};

// Enhanced empty state with subtle animation
const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 hover:scale-105 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg shadow-gray-900/20' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg shadow-gray-200/50'
      }`}>
        <svg 
          className={`w-10 h-10 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <div className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 ${
          theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/5'
        }`} />
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
        No data available
      </h3>
      <p className={`text-sm text-center max-w-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {message}
      </p>
    </div>
  );
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className = '',
  emptyMessage = 'No data available',
  rowKey = 'id'
}: DataTableProps<T>) {
  const { theme } = useTheme();
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null });

  // Generate row key
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    const column = columns.find(col => col.key === sortState.column);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === bValue) return 0;
      
      let comparison = 0;
      if (aValue == null) comparison = -1;
      else if (bValue == null) comparison = 1;
      else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        comparison = aValue < bValue ? -1 : 1;
      }

      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState, columns]);

  // Handle sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortState(prevState => {
      if (prevState.column !== column.key) {
        return { column: column.key, direction: 'asc' };
      }
      
      if (prevState.direction === 'asc') {
        return { column: column.key, direction: 'desc' };
      }
      
      if (prevState.direction === 'desc') {
        return { column: null, direction: null };
      }
      
      return { column: column.key, direction: 'asc' };
    });
  };

  // Handle row selection
  const handleRowSelect = (rowKey: string | number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    
    if (checked) {
      newSelectedRows.add(rowKey);
    } else {
      newSelectedRows.delete(rowKey);
    }
    
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = data.filter((_, index) => 
        newSelectedRows.has(getRowKey(data[index], index))
      );
      onRowSelect(selectedData);
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allRowKeys = new Set(data.map((record, index) => getRowKey(record, index)));
      setSelectedRows(allRowKeys);
      if (onRowSelect) {
        onRowSelect(data);
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  };

  const allSelected = selectedRows.size === data.length && data.length > 0;
  const someSelected = selectedRows.size > 0 && selectedRows.size < data.length;

  return (
    <div className={`rounded-xl border overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md ${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-sm shadow-gray-900/10' 
        : 'bg-white/80 border-gray-200/60 backdrop-blur-sm shadow-gray-900/5'
    } ${className}`}>
      {/* Table container with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="Data table">
          {/* Table header */}
          <thead className={`border-b transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-gray-700/60' 
              : 'bg-gradient-to-r from-gray-50/80 to-gray-100/80 border-gray-200/60'
          }`}>
            <tr role="row">
              {selectable && (
                <th 
                  className={`px-3 sm:px-4 py-2 sm:py-3 text-left ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  scope="col"
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={input => {
                        if (input) input.indeterminate = someSelected;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800'
                          : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500'
                      } focus:ring-2 focus:ring-offset-2`}
                      aria-label="Select all rows"
                    />
                    <span className="sr-only">Select all</span>
                  </label>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  } ${column.sortable ? 'cursor-pointer hover:bg-opacity-75 select-none' : ''}`}
                  onClick={() => handleSort(column)}
                  scope="col"
                  aria-sort={
                    sortState.column === column.key
                      ? sortState.direction === 'asc' ? 'ascending' : 'descending'
                      : 'none'
                  }
                >
                  <div className="flex items-center">
                    <span className="truncate">{column.title}</span>
                    {column.sortable && (
                      <SortIcon 
                        direction={sortState.column === column.key ? sortState.direction : null}
                        active={sortState.column === column.key}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody className={`divide-y ${
            theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
          }`}>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-4">
                  <LoadingSkeleton />
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-4">
                  <EmptyState message={emptyMessage} />
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => {
                const key = getRowKey(record, index);
                const isSelected = selectedRows.has(key);
                
                return (
                  <tr
                    key={key}
                    className={`transition-colors ${
                      isSelected
                        ? theme === 'dark'
                          ? 'bg-blue-900/20 hover:bg-blue-900/30'
                          : 'bg-blue-50 hover:bg-blue-100'
                        : theme === 'dark'
                          ? 'hover:bg-gray-700/50'
                          : 'hover:bg-gray-50'
                    }`}
                    role="row"
                    aria-selected={selectable ? isSelected : undefined}
                  >
                    {selectable && (
                      <td className="px-3 sm:px-4 py-2 sm:py-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleRowSelect(key, e.target.checked)}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 ${
                              theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800'
                                : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500'
                            } focus:ring-2 focus:ring-offset-2`}
                            aria-label={`Select row ${index + 1}`}
                          />
                          <span className="sr-only">Select row</span>
                        </label>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                        }`}
                        role="gridcell"
                      >
                        <div className="truncate max-w-[150px] sm:max-w-none">
                          {column.render
                            ? column.render(record[column.dataIndex], record, index)
                            : String(record[column.dataIndex] ?? '')
                          }
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Responsive Footer with selection info */}
      {selectable && selectedRows.size > 0 && (
        <div className={`px-3 sm:px-4 py-2 sm:py-3 border-t ${
          theme === 'dark' 
            ? 'bg-gray-900 border-gray-700 text-gray-300' 
            : 'bg-gray-50 border-gray-200 text-gray-700'
        }`}>
          <p className="text-xs sm:text-sm">
            {selectedRows.size} of {data.length} row{data.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
}

export default DataTable;
