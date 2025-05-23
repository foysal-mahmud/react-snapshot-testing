# Lesson 2: React Testing Library Deep Dive

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Master different query methods in React Testing Library
- Understand the query priority and best practices
- Test user interactions with advanced event simulation
- Handle async behavior in tests
- Test forms and form validation
- Create robust tests that prepare for snapshot testing

## 🔄 Building on Lesson 1
In Lesson 1, you learned the basics:
- `render()` to create virtual DOM
- `screen.getByRole()` and `screen.getByTestId()` for finding elements
- Basic `fireEvent.click()` interactions
- Introduction to snapshot testing

Now we'll go **much deeper**! 🚀

## 🔍 React Testing Library Query Methods

### **Query Types**
There are three types of queries, each with different purposes:

| Query Type | Returns | When to Use |
|------------|---------|-------------|
| **getBy*** | Element (throws if not found) | Element should be in DOM |
| **queryBy*** | Element or null | Element might not be in DOM |
| **findBy*** | Promise<Element> | Element will appear async |

### **Query Methods by Priority**

**1. 🥇 Queries Accessible to Everyone**
```typescript
// By Role (BEST - how users/screen readers interact)
screen.getByRole('button', { name: /submit/i })
screen.getByRole('textbox', { name: /username/i })
screen.getByRole('heading', { level: 2 })

// By Label Text (forms)
screen.getByLabelText(/password/i)
screen.getByLabelText('Email Address')
```

**2. 🥈 Semantic Queries**
```typescript
// By Alt Text (images)
screen.getByAltText(/profile picture/i)

// By Title (tooltips, title attributes)
screen.getByTitle(/close dialog/i)
```

**3. 🥉 Test IDs (Last Resort)**
```typescript
// By Test ID (when nothing else works)
screen.getByTestId('submit-button')
```

## 👆 User Interactions with userEvent

`@testing-library/user-event` is more realistic than `fireEvent`:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('user interactions', async () => {
  const user = userEvent.setup();
  render(<MyForm />);
  
  // Type in an input
  await user.type(screen.getByRole('textbox'), 'Hello World');
  
  // Click a button
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Clear an input
  await user.clear(screen.getByRole('textbox'));
  
  // Select from dropdown
  await user.selectOptions(screen.getByRole('combobox'), 'option1');
});
```

## ⏰ Testing Async Behavior

### **findBy Queries for Async Elements**
```typescript
test('async content appears', async () => {
  render(<AsyncComponent />);
  
  // Wait for element to appear (up to 1000ms by default)
  const element = await screen.findByText(/loaded data/i);
  expect(element).toBeInTheDocument();
});
```

### **waitFor for Complex Async Logic**
```typescript
import { waitFor } from '@testing-library/react';

test('complex async behavior', async () => {
  render(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  }, { timeout: 3000 });
});
```

## 📝 Form Testing Patterns

### **Input Testing**
```typescript
test('form input handling', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  await user.type(nameInput, 'John Doe');
  
  expect(nameInput).toHaveValue('John Doe');
});
```

### **Form Validation Testing**
```typescript
test('form validation', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  
  // Submit empty form
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Check for validation errors
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
});
```

## 🏗️ Lesson 2 Component Structure

We'll create these components to practice advanced RTL concepts:

```
src/components/lesson-02/
├── UserCard.tsx           # Multiple query types
├── UserCard.test.tsx      # Query practice
├── ContactForm.tsx        # Form interactions
├── ContactForm.test.tsx   # Form testing
├── AsyncLoader.tsx        # Async behavior
├── AsyncLoader.test.tsx   # Async testing
└── __snapshots__/         # Generated snapshots
```

## 🎯 Lesson 2 Exercises

### **Exercise 1: Query Practice**
- Use different query types (`getBy`, `queryBy`, `findBy`)
- Practice query priority (role > label > testid)
- Test conditional rendering

### **Exercise 2: User Interactions**
- Replace `fireEvent` with `userEvent`
- Test complex user flows
- Handle form interactions

### **Exercise 3: Async Testing**
- Test loading states
- Handle API call simulations
- Use `findBy` and `waitFor`

## 🎯 Key Takeaways for Snapshot Testing

The skills you learn here will make your snapshot tests more robust:
- **Better element selection** = More stable snapshots
- **User-focused testing** = Better component design
- **Async handling** = Consistent snapshot timing
- **Form testing** = Complex component snapshots

## 📚 Next Up
After mastering React Testing Library, you'll be ready for:
- **Lesson 3**: Deep dive into snapshot testing theory
- **Lesson 4**: Advanced snapshot testing techniques

---

**🎯 Goal**: Master React Testing Library to become a snapshot testing expert! 