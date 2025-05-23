import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

describe('Lesson 1: Welcome Component', () => {
  // Basic rendering test
  test('renders welcome message with default props', () => {
    render(<Welcome />);
    
    const welcomeHeading = screen.getByRole('heading', { level: 1 });
    expect(welcomeHeading).toHaveTextContent('Welcome, Guest!');
    
    const courseMessage = screen.getByText(/thank you for joining our react snapshot testing course/i);
    expect(courseMessage).toBeInTheDocument();
  });

  // Testing with props
  test('renders welcome message with custom name', () => {
    render(<Welcome name="John" />);
    
    const welcomeHeading = screen.getByRole('heading', { level: 1 });
    expect(welcomeHeading).toHaveTextContent('Welcome, John!');
  });

  // Testing conditional rendering
  test('does not render greeting when showGreeting is false', () => {
    render(<Welcome showGreeting={false} />);
    
    const welcomeHeading = screen.queryByRole('heading', { level: 1 });
    expect(welcomeHeading).not.toBeInTheDocument();
    
    // But the course message should still be there
    const courseMessage = screen.getByText(/thank you for joining our react snapshot testing course/i);
    expect(courseMessage).toBeInTheDocument();
  });

  // Testing element classes and structure
  test('renders with correct structure and data attributes', () => {
    render(<Welcome />);
    
    const container = screen.getByTestId('welcome-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('welcome-container');
    
    const dateInfo = screen.getByTestId('date-info');
    expect(dateInfo).toBeInTheDocument();
    expect(dateInfo).toHaveClass('info');
  });

  // LESSON 1 SNAPSHOT TESTS - Your introduction to snapshot testing! 🎉
  describe('Lesson 1: Introduction to Snapshot Testing', () => {
    test('matches snapshot with default props', () => {
      render(<Welcome />);
      const welcomeComponent = screen.getByTestId('welcome-container');
      expect(welcomeComponent).toMatchSnapshot();
    });

    test('matches snapshot with custom props', () => {
      render(<Welcome name="Alice" showGreeting={false} />);
      const welcomeComponent = screen.getByTestId('welcome-container');
      expect(welcomeComponent).toMatchSnapshot();
    });

    test('matches snapshot for lesson 1 student', () => {
      render(<Welcome name="Student" />);
      const welcomeComponent = screen.getByTestId('welcome-container');
      expect(welcomeComponent).toMatchSnapshot();
    });
  });
}); 