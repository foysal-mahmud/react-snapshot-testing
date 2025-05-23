# React Snapshot Testing - Learning Project

Welcome to your comprehensive React Snapshot Testing learning journey! 🚀

## 📚 What You'll Learn

This project is designed to take you from basic unit testing knowledge to mastering React snapshot testing. You'll learn through hands-on exercises, real-world examples, and progressive lessons.

## 🏗️ Project Structure

```
react-snapshot-testing/
├── src/
│   ├── components/          # Practice components for testing
│   │   ├── Welcome.tsx      # Your first snapshot testing component
│   │   ├── Welcome.test.tsx # Examples of unit + snapshot tests
│   │   └── __snapshots__/   # Generated snapshot files
│   ├── lessons/             # Structured lesson content
│   │   ├── lesson-01/       # Project Setup & Testing Environment
│   │   ├── lesson-02/       # React Testing Library Basics
│   │   ├── lesson-03/       # What is Snapshot Testing?
│   │   └── lesson-04/       # Your First Snapshot Test
│   └── ...
├── TESTING_LESSON_PLAN.md  # Complete 20-lesson curriculum
└── README.md               # This file
```

## 🚀 Getting Started

### 1. Run Your First Tests
```bash
# Run all tests
npm test

# Run tests without watch mode
npm test -- --watchAll=false

# Run specific test file
npm test Welcome

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

### 2. Explore What's Already Set Up

#### ✅ **Your First Snapshot Tests**
Look at `src/components/Welcome.test.tsx` to see:
- Unit tests for specific behavior
- Snapshot tests for overall structure
- How they work together

#### ✅ **Generated Snapshots**
Check `src/components/__snapshots__/Welcome.test.tsx.snap` to see:
- How Jest captures component output
- What snapshot files look like
- How different props create different snapshots

## 📖 Learning Path

### **Phase 1: Foundation (Week 1)**
- [ ] **Lesson 1**: Complete project setup ✅
- [ ] **Lesson 2**: Master React Testing Library basics
- [ ] **Lesson 3**: Understand snapshot testing concepts ✅
- [ ] **Lesson 4**: Write your first snapshot tests
- [ ] **Lesson 5**: Learn snapshot best practices

### **Phase 2: Practical Application (Week 2-3)**
- [ ] **Lessons 6-8**: Test components with props, state, and complex structures
- [ ] **Lessons 9-11**: Advanced techniques and tools
- [ ] **Lessons 12-14**: Real-world patterns and TypeScript

### **Phase 3: Mastery (Week 4-5)**
- [ ] **Lessons 15-17**: Maintenance and testing strategy
- [ ] **Lessons 18-20**: Advanced topics and portfolio building

## 🎯 Key Concepts You'll Master

### **Snapshot Testing Fundamentals**
- ✅ What snapshots are and how they work
- ✅ When to use snapshots vs unit tests
- ✅ Managing snapshot files and updates
- ✅ Handling dynamic content

### **Advanced Techniques**
- ✅ Inline snapshots
- ✅ Property matchers
- ✅ Custom serializers
- ✅ Performance optimization

### **Real-World Applications**
- ✅ Testing forms and user interactions
- ✅ API integration testing
- ✅ Visual regression testing
- ✅ CI/CD integration

## 🛠️ Available Commands

```bash
# Development
npm start                    # Run development server
npm run build               # Build for production

# Testing
npm test                    # Run tests in watch mode
npm test -- --watchAll=false   # Run tests once
npm test ComponentName      # Run specific test
npm test -- --coverage     # Run with coverage report
npm test -- --updateSnapshot   # Update all snapshots

# Specific to snapshot testing
npm test -- --u            # Update snapshots (shorthand)
npm test -- --verbose      # Detailed test output
```

## 🧪 Practice Components

### **Welcome Component** ✅
- **File**: `src/components/Welcome.tsx`
- **Tests**: `src/components/Welcome.test.tsx`
- **Covers**: Basic props, conditional rendering, snapshot testing

### **Coming Soon** (Built during lessons)
- Counter Component (useState, interactions)
- TodoList (complex state, arrays)
- UserProfile (API integration, async)
- ProductCard (styling, responsive)

## 📝 Testing Patterns You'll Learn

### **1. Basic Snapshot Test**
```typescript
test('matches snapshot', () => {
  render(<Component />);
  const component = screen.getByTestId('component');
  expect(component).toMatchSnapshot();
});
```

### **2. Props-Based Snapshots**
```typescript
test('renders different states', () => {
  const states = [
    { loading: true },
    { loading: false, data: mockData },
    { loading: false, error: 'Failed' }
  ];
  
  states.forEach(props => {
    const { container } = render(<Component {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### **3. Inline Snapshots**
```typescript
test('small component inline snapshot', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toMatchInlineSnapshot(`
    <button>
      Click me
    </button>
  `);
});
```

## 🎯 Learning Milestones

Track your progress:

- [ ] **Milestone 1**: Can write and understand basic snapshot tests
- [ ] **Milestone 2**: Can update snapshots and review changes meaningfully
- [ ] **Milestone 3**: Can handle dynamic content and complex components
- [ ] **Milestone 4**: Can implement comprehensive testing strategies
- [ ] **Milestone 5**: Can mentor others and optimize test performance

## 🔧 Troubleshooting

### **Snapshot Test Failed?**
```bash
# View the diff
npm test ComponentName

# Update if change was intentional
npm test ComponentName -- --updateSnapshot
```

### **Date/Time Issues in Snapshots?**
See Lesson 10 for handling dynamic content with property matchers.

### **Large Snapshot Diffs?**
See Lesson 11 for custom serializers and focused testing.

## 📚 Additional Resources

- [Jest Snapshot Testing Docs](https://jestjs.io/docs/snapshot-testing)
- [React Testing Library Guide](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🤝 Next Steps

1. **Read the complete lesson plan**: `TESTING_LESSON_PLAN.md`
2. **Start with Lesson 1**: `src/lessons/lesson-01/README.md`
3. **Run the tests**: `npm test`
4. **Explore the Welcome component**: `src/components/Welcome.tsx`
5. **Check out the snapshots**: `src/components/__snapshots__/`

---

**Ready to become a snapshot testing expert? Let's get started! 🎉**

*Happy Testing!* 🧪✨
