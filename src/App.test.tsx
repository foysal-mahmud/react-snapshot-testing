import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component - Lesson Structure', () => {
  test('renders main header', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /react snapshot testing - learning journey/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders lesson 1 section', () => {
    render(<App />);
    const lesson1Section = screen.getByTestId('lesson-1-section');
    expect(lesson1Section).toBeInTheDocument();
    
    const lesson1Heading = screen.getByRole('heading', { name: /lesson 1: testing foundations/i });
    expect(lesson1Heading).toBeInTheDocument();
  });

  test('renders lesson 2 section', () => {
    render(<App />);
    const lesson2Section = screen.getByTestId('lesson-2-section');
    expect(lesson2Section).toBeInTheDocument();
    
    const lesson2Heading = screen.getByRole('heading', { name: /lesson 2: react testing library mastery/i });
    expect(lesson2Heading).toBeInTheDocument();
  });

  test('renders progress section', () => {
    render(<App />);
    const progressSection = screen.getByTestId('progress-section');
    expect(progressSection).toBeInTheDocument();
    
    const progressHeading = screen.getByRole('heading', { name: /learning progress/i });
    expect(progressHeading).toBeInTheDocument();
  });

  test('contains lesson 1 components', () => {
    render(<App />);
    
    // Welcome component
    const welcomeContainer = screen.getByTestId('welcome-container');
    expect(welcomeContainer).toBeInTheDocument();
    
    // Basic buttons
    const buttons = screen.getAllByTestId('basic-button');
    expect(buttons).toHaveLength(3); // Primary, Secondary, Disabled
  });

  test('contains lesson 2 components', () => {
    render(<App />);
    
    // User cards
    const userCards = screen.getAllByTestId('user-card');
    expect(userCards).toHaveLength(3); // Alice, Bob, Carol
    
    // Contact form
    const contactForm = screen.getByTestId('contact-form');
    expect(contactForm).toBeInTheDocument();
    
    // Async loader
    const asyncLoader = screen.getByTestId('async-loader');
    expect(asyncLoader).toBeInTheDocument();
  });

  test('displays completed lesson progress', () => {
    render(<App />);
    
    // Check for completed lessons
    expect(screen.getByText(/lesson 1: foundations/i)).toBeInTheDocument();
    expect(screen.getByText(/lesson 2: rtl deep dive/i)).toBeInTheDocument();
    
    // Check for upcoming lesson
    expect(screen.getByText(/lesson 3: snapshot testing theory/i)).toBeInTheDocument();
  });

  test('displays footer with goal', () => {
    render(<App />);
    
    const footer = screen.getByText(/goal: master react snapshot testing/i);
    expect(footer).toBeInTheDocument();
  });

  // Snapshot Tests
  test('matches app structure snapshot', () => {
    render(<App />);
    const appContainer = screen.getByRole('main');
    expect(appContainer).toMatchSnapshot();
  });

  test('matches lesson 1 section snapshot', () => {
    render(<App />);
    const lesson1Section = screen.getByTestId('lesson-1-section');
    expect(lesson1Section).toMatchSnapshot();
  });

  test('matches lesson 2 section snapshot', () => {
    render(<App />);
    const lesson2Section = screen.getByTestId('lesson-2-section');
    expect(lesson2Section).toMatchSnapshot();
  });
});
