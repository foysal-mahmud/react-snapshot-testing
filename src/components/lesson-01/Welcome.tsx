import React from 'react';

interface WelcomeProps {
  name?: string;
  showGreeting?: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({ 
  name = 'Guest', 
  showGreeting = true 
}) => {
  return (
    <div className="welcome-container" data-testid="welcome-container">
      {showGreeting && (
        <h1>Welcome, {name}!</h1>
      )}
      <p>Thank you for joining our React Snapshot Testing course.</p>
      <div className="info" data-testid="date-info">
        <span>Current date: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Welcome; 