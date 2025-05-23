# Lesson 3: What is Snapshot Testing?

## 🎯 Learning Objectives
By the end of this lesson, you will understand:
- What snapshot testing is and how it works
- The difference between unit tests and snapshot tests
- When to use snapshot tests vs other testing approaches
- How Jest creates and manages snapshot files
- Benefits and limitations of snapshot testing

## 🤔 What is Snapshot Testing?

**Snapshot testing** is a testing technique where you capture the rendered output of a component and save it as a "snapshot" file. Future test runs compare the current output against this saved snapshot to detect unexpected changes.

Think of it like taking a photo of your component's output - if anything changes, you'll know immediately!

## 📸 How Snapshot Testing Works

### 1. First Run: Creating the Snapshot
```typescript
test('matches snapshot', () => {
  render(<MyComponent prop="value" />);
  const component = screen.getByTestId('my-component');
  expect(component).toMatchSnapshot();
});
```

**What happens:**
1. Jest renders your component
2. Captures the HTML output
3. Saves it to a `.snap` file in `__snapshots__` folder
4. Test passes ✅

### 2. Subsequent Runs: Comparing Snapshots
```typescript
// Same test code runs again
test('matches snapshot', () => {
  render(<MyComponent prop="value" />);
  const component = screen.getByTestId('my-component');
  expect(component).toMatchSnapshot(); // Compares with saved snapshot
});
```

**What happens:**
1. Jest renders your component again
2. Compares new output with saved snapshot
3. ✅ **Pass**: If identical
4. ❌ **Fail**: If different (shows diff)

## 🆚 Snapshot Tests vs Unit Tests

| Aspect | Unit Tests | Snapshot Tests |
|--------|------------|----------------|
| **Purpose** | Test specific behavior | Detect unexpected changes |
| **What they test** | Individual functions/logic | Rendered output |
| **Failure reason** | Logic/behavior changed | Visual/structure changed |
| **Maintenance** | Update test logic | Update snapshot file |
| **Best for** | Business logic, interactions | UI consistency, regressions |

### Example Comparison

**Unit Test:**
```typescript
test('displays correct welcome message', () => {
  render(<Welcome name="John" />);
  expect(screen.getByRole('heading')).toHaveTextContent('Welcome, John!');
});
```
*Tests specific behavior: "Does it show the right name?"*

**Snapshot Test:**
```typescript
test('renders correctly', () => {
  render(<Welcome name="John" />);
  expect(screen.getByTestId('welcome')).toMatchSnapshot();
});
```
*Tests overall output: "Does everything look the same as before?"*

## 📁 Understanding Snapshot Files

When you run a snapshot test, Jest creates a `.snap` file:

```
src/
  components/
    __snapshots__/
      Welcome.test.tsx.snap
    Welcome.test.tsx
    Welcome.tsx
```

### Inside a Snapshot File:
```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Welcome Component matches snapshot with default props 1`] = `
<div
  class="welcome-container"
  data-testid="welcome-container"
>
  <h1>
    Welcome, Guest!
  </h1>
  <p>
    Thank you for joining our React Snapshot Testing course.
  </p>
  <div
    class="info"
    data-testid="date-info"
  >
    <span>
      Current date: 12/15/2023
    </span>
  </div>
</div>
`;
```

## ✅ When to Use Snapshot Tests

### **Great for:**
- **Component structure verification**: Ensure HTML structure doesn't change unexpectedly
- **CSS class consistency**: Catch when classes are accidentally removed
- **Regression testing**: Detect unintended changes during refactoring
- **Large component trees**: Test complex nested components efficiently
- **Initial development**: Quickly create tests for new components

### **Not ideal for:**
- **Dynamic content**: Components with timestamps, random IDs, etc.
- **Testing logic**: Use unit tests for business logic
- **User interactions**: Use integration tests for click handlers, etc.
- **API responses**: Mock data that changes frequently

## ⚖️ Benefits and Limitations

### ✅ **Benefits:**
- **Fast to write**: One line creates comprehensive test
- **Catches regressions**: Immediately notice unexpected changes
- **Documentation**: Snapshots serve as component documentation
- **Refactoring confidence**: Safely change code knowing structure is preserved
- **Comprehensive coverage**: Tests entire component output

### ⚠️ **Limitations:**
- **False positives**: Legitimate changes require snapshot updates
- **Not behavior-focused**: Don't test what component actually does
- **Maintenance overhead**: Need to review and update snapshots
- **Large diffs**: Hard to read when components are complex
- **Dynamic content issues**: Timestamps, IDs can cause flaky tests

## 🎯 Best Practices Preview

1. **Keep snapshots small and focused**
2. **Review snapshot changes carefully**
3. **Use descriptive test names**
4. **Combine with unit tests, don't replace them**
5. **Handle dynamic content properly**

## 🚀 Try It Yourself!

Look at the snapshot tests we created in `Welcome.test.tsx`:

```bash
npm test Welcome
```

Check the generated snapshot file:
```bash
cat src/components/__snapshots__/Welcome.test.tsx.snap
```

## 🎯 Key Takeaways

- **Snapshot tests capture component output** and detect changes
- **They complement unit tests**, not replace them
- **Great for UI consistency** and regression detection
- **Require careful review** when updating
- **Best combined with other testing strategies**

## 📚 Next Up

In Lesson 4, we'll create your first snapshot test from scratch and learn how to:
- Write effective snapshot tests
- Update snapshots when changes are intentional
- Handle dynamic content in snapshots
- Organize snapshot tests effectively

---

**🔍 Quick Check**: Run `npm test` and look for the `.snap` files created. Open one and examine the structure! 