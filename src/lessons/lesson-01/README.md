# Lesson 1: Project Setup & Testing Environment

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand the React testing setup with Create React App
- Know how Jest and React Testing Library work together
- Run your first test
- Understand the test file structure
- Work with lesson-organized components

## 📋 What's Already Set Up For You

### 1. Testing Libraries Included
- **Jest**: The testing framework (comes with Create React App)
- **React Testing Library**: For testing React components
- **@testing-library/jest-dom**: Additional matchers for DOM assertions
- **@testing-library/user-event**: For simulating user interactions

### 2. Configuration Files
- `setupTests.ts`: Global test setup (imports jest-dom)
- `tsconfig.json`: TypeScript configuration
- Jest configuration is built into Create React App

### 3. Test Scripts in package.json
```json
{
  "scripts": {
    "test": "react-scripts test",
    "test:coverage": "npm test -- --coverage --verbose"
  }
}
```

## 🏗️ Lesson 1 Component Structure

We've organized components by lesson for better learning progression:

```
src/
├── components/
│   └── lesson-01/           # 📁 Lesson 1 Components
│       ├── Welcome.tsx      # Welcome component with props
│       ├── Welcome.test.tsx # Welcome component tests
│       ├── BasicButton.tsx  # Interactive button component
│       ├── BasicButton.test.tsx # Button tests (unit + snapshot)
│       └── __snapshots__/   # Generated snapshot files
└── App.tsx                  # Main app showcasing lesson components
```

## 🔍 Understanding the Default Test

Let's look at the existing `App.test.tsx`:

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders course title', () => {
  render(<App />);
  const title = screen.getByText('React Snapshot Testing Course');
  expect(title).toBeInTheDocument();
});
```

### What's happening here?
1. **Import statements**: Getting React, testing utilities, and the component to test
2. **render()**: Renders the component to a virtual DOM
3. **screen.getByText()**: Finds an element by its text content
4. **expect().toBeInTheDocument()**: Asserts the element exists

## 🚀 Let's Run the Tests!

### Run All Tests
```bash
npm test -- --watchAll=false
```

### Run Lesson 1 Components Only
```bash
npm test lesson-01 -- --watchAll=false
```

### Run Specific Component Tests
```bash
npm test BasicButton -- --watchAll=false
npm test Welcome -- --watchAll=false
```

### Run Tests with Coverage
```bash
npm test -- --coverage --watchAll=false
```

## 📝 Lesson 1 Components

### **Welcome Component** 
- **File**: `src/components/lesson-01/Welcome.tsx`
- **Tests**: `src/components/lesson-01/Welcome.test.tsx`
- **Purpose**: Demonstrates basic props, conditional rendering, and snapshot testing

```typescript
<Welcome name="Student" showGreeting={true} />
```

### **BasicButton Component**
- **File**: `src/components/lesson-01/BasicButton.tsx`
- **Tests**: `src/components/lesson-01/BasicButton.test.tsx`
- **Purpose**: Demonstrates user interactions, variants, and comprehensive testing

```typescript
<BasicButton variant="primary" onClick={handleClick}>
  Click me
</BasicButton>
```

## 🧪 Lesson 1 Exercises

### Exercise 1: Run the Tests
```bash
# Run all lesson 1 tests
npm test lesson-01

# You should see:
# ✓ Lesson 1: Welcome Component tests
# ✓ Lesson 1: BasicButton Component tests
# ✓ Snapshot tests passing
```

### Exercise 2: Examine Snapshot Files
```bash
# Look at generated snapshots
ls src/components/lesson-01/__snapshots__/

# Read the snapshot contents
cat src/components/lesson-01/__snapshots__/Welcome.test.tsx.snap
```

### Exercise 3: Try Breaking a Test
1. Open `src/components/lesson-01/Welcome.tsx`
2. Change "Thank you for joining" to "Welcome to"
3. Run `npm test Welcome`
4. See the snapshot mismatch!
5. Run `npm test Welcome -- --updateSnapshot` to update
6. Revert your change

## 🎯 Key Takeaways
- **Lesson organization**: Components are organized by lesson for clear learning progression
- **Jest** is the test runner and assertion library
- **React Testing Library** provides utilities for testing React components
- **Tests should focus** on what users see and do
- **Snapshots capture** the full component output

## 🔄 Testing Patterns You've Learned

### **Unit Tests** (Testing Behavior)
```typescript
test('calls onClick when clicked', () => {
  const mockOnClick = jest.fn();
  render(<BasicButton onClick={mockOnClick}>Click</BasicButton>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(mockOnClick).toHaveBeenCalled();
});
```

### **Snapshot Tests** (Testing Structure)
```typescript
test('matches snapshot with default props', () => {
  render(<BasicButton>Default</BasicButton>);
  const button = screen.getByTestId('basic-button');
  expect(button).toMatchSnapshot();
});
```

## 📚 Next Up
In Lesson 2, we'll dive deeper into React Testing Library basics and learn about different ways to find and interact with elements.

But since you want to focus on snapshot testing, you can jump directly to **Lesson 3: What is Snapshot Testing?**

---

**Pro Tip**: Your lesson components are now organized! Each lesson will have its own component folder with focused examples. 📁✨ 