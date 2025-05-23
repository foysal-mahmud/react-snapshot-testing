import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component - Lesson Structure', () => {
  test('renders course title', () => {
    render(<App />);
    const title = screen.getByText('React Snapshot Testing Course');
    expect(title).toBeInTheDocument();
  });

  test('renders lesson 1 section', () => {
    render(<App />);
    const lesson1Section = screen.getByTestId('lesson-1-section');
    expect(lesson1Section).toBeInTheDocument();
    
    const lesson1Title = screen.getByText('Lesson 1: Basic Testing Setup');
    expect(lesson1Title).toBeInTheDocument();
  });

  test('renders welcome component with student name', () => {
    render(<App />);
    const welcomeHeading = screen.getByText('Welcome, Student!');
    expect(welcomeHeading).toBeInTheDocument();
  });

  test('renders all three lesson 1 buttons', () => {
    render(<App />);
    
    const primaryButton = screen.getByText('Primary Button');
    const secondaryButton = screen.getByText('Secondary Button');
    const disabledButton = screen.getByText('Disabled Button');
    
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
    expect(disabledButton).toBeInTheDocument();
    expect(disabledButton).toBeDisabled();
  });

  test('primary button shows alert when clicked', () => {
    // Mock window.alert
    window.alert = jest.fn();
    
    render(<App />);
    const primaryButton = screen.getByText('Primary Button');
    fireEvent.click(primaryButton);
    
    expect(window.alert).toHaveBeenCalledWith('Hello from Lesson 1!');
    
    // Restore original alert
    jest.restoreAllMocks();
  });

  test('renders course info section', () => {
    render(<App />);
    const courseInfo = screen.getByTestId('course-info');
    expect(courseInfo).toBeInTheDocument();
    
    const learnLink = screen.getByText('Learn React Testing');
    expect(learnLink).toBeInTheDocument();
    expect(learnLink).toHaveAttribute('href', 'https://reactjs.org');
  });

  // Lesson 1 focused snapshot test
  test('matches lesson 1 app structure snapshot', () => {
    render(<App />);
    const appContainer = screen.getByTestId('app-container');
    expect(appContainer).toMatchSnapshot();
  });
});
