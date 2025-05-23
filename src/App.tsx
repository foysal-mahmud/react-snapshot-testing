import React from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './components/lesson-01/Welcome';
import BasicButton from './components/lesson-01/BasicButton';

function App() {
  const handleButtonClick = () => {
    alert('Hello from Lesson 1!');
  };

  return (
    <div className="App" data-testid="app-container">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React Snapshot Testing Course</h1>
        <p>
          Learn snapshot testing step by step with organized lessons!
        </p>
      </header>
      
      <main>
        <section data-testid="lesson-1-section">
          <h2>Lesson 1: Basic Testing Setup</h2>
          <Welcome name="Student" />
          
          <div style={{ margin: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <BasicButton onClick={handleButtonClick} variant="primary">
              Primary Button
            </BasicButton>
            <BasicButton variant="secondary">
              Secondary Button
            </BasicButton>
            <BasicButton disabled>
              Disabled Button
            </BasicButton>
          </div>
        </section>
        
        <section data-testid="course-info">
          <p>
            <a
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="App-link"
            >
              Learn React Testing
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
