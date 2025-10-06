import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from '../components/ThemeToggle';
import { ThemeProvider } from '../components/ThemeContext';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A theme toggle button that switches between light and dark themes with smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the theme toggle button',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'border-2 border-blue-500',
  },
};

// Interactive demo showing theme switching
export const InteractiveDemo: Story = {
  render: () => {
    return (
      <ThemeProvider defaultTheme="light">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Theme Toggle Demo</h3>
            <ThemeToggle size="lg" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Click the theme toggle button above to see the theme change in real-time!
          </p>
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing the theme toggle in action.',
      },
    },
  },
};
