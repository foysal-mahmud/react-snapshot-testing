import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicButton from './BasicButton';

describe('Lesson 1: BasicButton Component', () => {
  
  // UNIT TESTS - Testing specific behaviors
  describe('Unit Tests - Behavior Testing', () => {
    test('renders children correctly', () => {
      render(<BasicButton>Click me</BasicButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Click me');
    });

    test('calls onClick when clicked', () => {
      const mockOnClick = jest.fn();
      render(<BasicButton onClick={mockOnClick}>Click me</BasicButton>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('is disabled when disabled prop is true', () => {
      render(<BasicButton disabled>Disabled Button</BasicButton>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    test('does not call onClick when disabled', () => {
      const mockOnClick = jest.fn();
      render(
        <BasicButton onClick={mockOnClick} disabled>
          Disabled Button
        </BasicButton>
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    test('applies correct CSS classes for variants', () => {
      const { rerender } = render(<BasicButton variant="primary">Primary</BasicButton>);
      
      let button = screen.getByRole('button');
      expect(button).toHaveClass('btn', 'btn-primary');
      
      rerender(<BasicButton variant="secondary">Secondary</BasicButton>);
      button = screen.getByRole('button');
      expect(button).toHaveClass('btn', 'btn-secondary');
    });
  });

  // SNAPSHOT TESTS - Testing overall structure
  describe('Snapshot Tests - Structure Testing', () => {
    test('matches snapshot with default props', () => {
      render(<BasicButton>Default Button</BasicButton>);
      const button = screen.getByTestId('basic-button');
      expect(button).toMatchSnapshot();
    });

    test('matches snapshot with primary variant', () => {
      render(<BasicButton variant="primary">Primary Button</BasicButton>);
      const button = screen.getByTestId('basic-button');
      expect(button).toMatchSnapshot();
    });

    test('matches snapshot with secondary variant', () => {
      render(<BasicButton variant="secondary">Secondary Button</BasicButton>);
      const button = screen.getByTestId('basic-button');
      expect(button).toMatchSnapshot();
    });

    test('matches snapshot when disabled', () => {
      render(<BasicButton disabled>Disabled Button</BasicButton>);
      const button = screen.getByTestId('basic-button');
      expect(button).toMatchSnapshot();
    });

    test('matches snapshot with all props', () => {
      render(
        <BasicButton variant="secondary" disabled onClick={() => {}}>
          Complex Button
        </BasicButton>
      );
      const button = screen.getByTestId('basic-button');
      expect(button).toMatchSnapshot();
    });
  });

  // LESSON 1 LEARNING OBJECTIVES
  describe('Lesson 1 Learning Demonstration', () => {
    test('demonstrates finding elements by role', () => {
      render(<BasicButton>Find Me</BasicButton>);
      
      // This is how React Testing Library recommends finding elements
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    test('demonstrates finding elements by test id', () => {
      render(<BasicButton>Find Me</BasicButton>);
      
      // Using data-testid is also a good practice
      const button = screen.getByTestId('basic-button');
      expect(button).toBeInTheDocument();
    });

    test('demonstrates testing user interactions', () => {
      const handleClick = jest.fn();
      render(<BasicButton onClick={handleClick}>Interactive Button</BasicButton>);
      
      // Simulate user clicking the button
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      // Verify the interaction worked
      expect(handleClick).toHaveBeenCalled();
    });
  });
}); 