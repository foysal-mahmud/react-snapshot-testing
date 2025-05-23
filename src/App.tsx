import React from 'react';
import './App.css';

// Lesson 1 Components
import Welcome from './components/lesson-01/Welcome';
import BasicButton from './components/lesson-01/BasicButton';

// Lesson 2 Components
import UserCard from './components/lesson-02/UserCard';
import ContactForm from './components/lesson-02/ContactForm';
import AsyncLoader from './components/lesson-02/AsyncLoader';

function App() {
  const handleButtonClick = (message: string) => {
    alert(`Button clicked: ${message}`);
  };

  const handleFormSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Snapshot Testing - Learning Journey</h1>
        <p>Master React Testing Library & Snapshot Testing</p>
      </header>

      <main className="App-content">
        {/* Lesson 1: Foundation */}
        <section className="lesson-section" data-testid="lesson-1-section">
          <h2>📚 Lesson 1: Testing Foundations</h2>
          <p>Basic components, unit tests, and introduction to snapshot testing</p>
          
          <div className="component-showcase">
            <Welcome 
              name="React Testing Student" 
              showGreeting={true}
            />
            
            <div className="button-group">
              <BasicButton 
                onClick={() => handleButtonClick('Primary button')}
                variant="primary"
              >
                Primary Action
              </BasicButton>
              
              <BasicButton 
                onClick={() => handleButtonClick('Secondary button')}
                variant="secondary"
              >
                Secondary Action
              </BasicButton>
              
              <BasicButton 
                onClick={() => handleButtonClick('Disabled button')}
                variant="primary"
                disabled={true}
              >
                Disabled Button
              </BasicButton>
            </div>
          </div>
        </section>

        {/* Lesson 2: React Testing Library Deep Dive */}
        <section className="lesson-section" data-testid="lesson-2-section">
          <h2>🔍 Lesson 2: React Testing Library Mastery</h2>
          <p>Query methods, user interactions, forms, and async testing</p>
          
          <div className="component-showcase">
            {/* User Card Examples */}
            <div className="user-cards">
              <h3>User Cards - Query Methods Practice</h3>
              <div className="cards-grid">
                <UserCard 
                  name="Alice Johnson"
                  email="alice@example.com"
                  avatar="https://via.placeholder.com/60x60/4f46e5/ffffff?text=AJ"
                  role="admin"
                  isOnline={true}
                  bio="Senior developer and team lead with expertise in React and TypeScript."
                />
                
                <UserCard 
                  name="Bob Smith"
                  email="bob@example.com"
                  role="user"
                  isOnline={false}
                  bio="Frontend developer passionate about creating amazing user experiences."
                />
                
                <UserCard 
                  name="Carol Davis"
                  email="carol@example.com"
                  role="guest"
                  isOnline={true}
                  showActions={false}
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <h3>Contact Form - Form Testing & Validation</h3>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>

            {/* Async Loader */}
            <div className="async-loader-section">
              <h3>Async Loader - Async Testing Patterns</h3>
              <AsyncLoader loadDelay={500} />
            </div>
          </div>
        </section>

        {/* Progress Tracker */}
        <section className="progress-section" data-testid="progress-section">
          <h2>📈 Learning Progress</h2>
          <div className="progress-grid">
            <div className="progress-item completed">
              <h4>✅ Lesson 1: Foundations</h4>
              <ul>
                <li>Component rendering with React Testing Library</li>
                <li>Basic queries (getByRole, getByTestId)</li>
                <li>User interactions with fireEvent</li>
                <li>Introduction to snapshot testing</li>
                <li>Test organization and structure</li>
              </ul>
            </div>
            
            <div className="progress-item completed">
              <h4>✅ Lesson 2: RTL Deep Dive</h4>
              <ul>
                <li>Query priority (role {'>'} label {'>'} testid)</li>
                <li>getBy vs queryBy vs findBy queries</li>
                <li>Advanced userEvent interactions</li>
                <li>Form testing and validation</li>
                <li>Async testing with findBy and waitFor</li>
                <li>Advanced snapshot testing techniques</li>
              </ul>
            </div>
            
            <div className="progress-item upcoming">
              <h4>🔜 Lesson 3: Snapshot Testing Theory</h4>
              <ul>
                <li>When to use snapshot tests</li>
                <li>Snapshot best practices</li>
                <li>Managing snapshot files</li>
                <li>Snapshot testing pitfalls</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>🎯 Goal: Master React Snapshot Testing for better component testing!</p>
      </footer>
    </div>
  );
}

export default App;
