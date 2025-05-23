# Lesson 1: Testing Foundations & Basic Snapshot Testing

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Set up a React testing environment with Jest and React Testing Library
- Understand the difference between unit tests and snapshot tests
- Create your first components with proper testing structure
- Write basic unit tests using React Testing Library
- Generate and understand snapshot tests
- Organize tests in a scalable lesson-based structure

## 📚 Prerequisites
- Basic React knowledge (components, props, JSX)
- Understanding of JavaScript ES6+ features
- Familiarity with npm and command line basics

## 🏗️ Project Setup
This lesson establishes the foundation for your React snapshot testing journey:

### **Testing Environment**
- **Jest**: JavaScript testing framework (built into Create React App)
- **React Testing Library**: Simple and complete testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing
- **@testing-library/user-event**: Realistic user interaction simulation

### **Project Structure**
```
src/
├── components/
│   └── lesson-01/
│       ├── Welcome.tsx
│       ├── Welcome.test.tsx
│       ├── BasicButton.tsx
│       ├── BasicButton.test.tsx
│       └── __snapshots__/
├── lessons/
│   └── lesson-01/
│       ├── README.md
│       └── LESSON_1_SUMMARY.md
└── App.tsx (integration showcase)
```

## 🧩 Components in This Lesson

### **1. Welcome Component**
**Purpose**: Introduction to basic testing concepts
- Props handling and default values
- Conditional rendering with `showGreeting`
- Date display functionality
- Basic snapshot testing introduction

**Testing Concepts**:
- `render()` - Creating virtual DOM
- `screen.getByTestId()` - Finding elements
- `expect().toBeInTheDocument()` - Basic assertions
- `.toMatchSnapshot()` - First snapshot test

### **2. BasicButton Component**
**Purpose**: Interactive component testing and variations
- Click event handling with mock functions
- Button variants (primary, secondary)
- Disabled state management
- CSS class validation

**Testing Concepts**:
- `jest.fn()` - Mock functions
- `fireEvent.click()` - User interactions
- Props testing with different variants
- Multiple component states in snapshots

## 🧪 Testing Patterns Introduced

### **Unit Testing Basics**
```typescript
test('renders welcome message', () => {
  render(<Welcome name="Student" />);
  const heading = screen.getByTestId('welcome-container');
  expect(heading).toBeInTheDocument();
});
```

### **Snapshot Testing Introduction**
```typescript
test('matches component snapshot', () => {
  render(<Welcome name="Test User" />);
  const container = screen.getByTestId('welcome-container');
  expect(container).toMatchSnapshot();
});
```

### **Interactive Testing**
```typescript
test('handles button click', () => {
  const mockClick = jest.fn();
  render(<BasicButton onClick={mockClick}>Click me</BasicButton>);
  
  fireEvent.click(screen.getByTestId('basic-button'));
  expect(mockClick).toHaveBeenCalledTimes(1);
});
```

## 📊 Key Concepts Learned

### **Unit Tests vs Snapshot Tests**
- **Unit Tests**: Test specific behavior and functionality
- **Snapshot Tests**: Capture component structure for regression testing
- **When to Use Each**: Unit tests for logic, snapshots for UI consistency

### **React Testing Library Philosophy**
- Test components as users would interact with them
- Focus on accessibility and user experience
- Avoid testing implementation details

### **Test Organization**
- Lesson-based component organization
- Consistent naming conventions
- Separation of concerns (components, tests, snapshots)

## 🎯 Skills Gained

By completing Lesson 1, you have:
- ✅ **Environment Setup**: Configured comprehensive testing environment
- ✅ **Basic Testing**: Written unit tests with React Testing Library
- ✅ **Snapshot Introduction**: Created first snapshot tests
- ✅ **Component Structure**: Organized tests in scalable manner
- ✅ **Testing Patterns**: Learned fundamental testing patterns
- ✅ **Mock Functions**: Used Jest mocks for event handling

## 📚 Next Steps

Lesson 1 provides the foundation for:
- **Lesson 2**: React Testing Library deep dive with advanced queries
- **Lesson 3**: Snapshot testing theory and best practices
- **Lesson 4**: Advanced snapshot testing techniques

## 🔗 Related Files
- **Components**: `src/components/lesson-01/`
- **Tests**: `src/components/lesson-01/*.test.tsx`
- **Snapshots**: `src/components/lesson-01/__snapshots__/`
- **Summary**: `LESSON_1_SUMMARY.md`

---

**🎯 Goal**: Build a solid foundation in React testing that prepares you for advanced snapshot testing mastery! 