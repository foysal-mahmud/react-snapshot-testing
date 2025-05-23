import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('Lesson 2: ContactForm Component - Forms & Async Testing', () => {
  
  // 📝 FORM TESTING FUNDAMENTALS
  describe('Form Elements and Labels', () => {
    test('finds form elements by label text (best practice)', () => {
      render(<ContactForm />);
      
      // This is the GOLD STANDARD for form testing
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subscribe to our newsletter/i)).toBeInTheDocument();
    });

    test('finds form by role and aria-label', () => {
      render(<ContactForm />);
      
      const form = screen.getByRole('form', { name: /contact form/i });
      expect(form).toBeInTheDocument();
    });

    test('finds submit button by role', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      const resetButton = screen.getByRole('button', { name: /reset/i });
      
      expect(submitButton).toBeInTheDocument();
      expect(resetButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    test('finds select dropdown by role', () => {
      render(<ContactForm />);
      
      const subjectSelect = screen.getByRole('combobox', { name: /subject/i });
      expect(subjectSelect).toBeInTheDocument();
    });
  });

  // 👆 USER INTERACTIONS WITH FORMS
  describe('User Interactions with userEvent', () => {
    test('allows user to type in text inputs', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      
      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');
    });

    test('allows user to select from dropdown', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const subjectSelect = screen.getByLabelText(/subject/i);
      
      await user.selectOptions(subjectSelect, 'support');
      expect(subjectSelect).toHaveValue('support');
      
      // Test that the correct option is selected
      expect(screen.getByRole('option', { name: /technical support/i })).toBeInTheDocument();
    });

    test('allows user to type in textarea', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const messageTextarea = screen.getByLabelText(/message/i);
      const testMessage = 'This is a test message for the contact form.';
      
      await user.type(messageTextarea, testMessage);
      expect(messageTextarea).toHaveValue(testMessage);
    });

    test('allows user to toggle checkbox', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const newsletterCheckbox = screen.getByLabelText(/subscribe to our newsletter/i);
      
      expect(newsletterCheckbox).not.toBeChecked();
      
      await user.click(newsletterCheckbox);
      expect(newsletterCheckbox).toBeChecked();
      
      await user.click(newsletterCheckbox);
      expect(newsletterCheckbox).not.toBeChecked();
    });
  });

  // ✅ FORM VALIDATION TESTING
  describe('Form Validation', () => {
    test('shows validation errors for empty required fields', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Submit empty form
      await user.click(submitButton);
      
      // Check for validation errors using different query methods
      expect(screen.getByTestId('name-error')).toHaveTextContent('Name is required');
      expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
      expect(screen.getByTestId('subject-error')).toHaveTextContent('Subject is required');
      expect(screen.getByTestId('message-error')).toHaveTextContent('Message is required');
    });

    test('shows specific validation errors for invalid input', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Enter invalid data
      await user.type(nameInput, 'A'); // Too short
      await user.type(emailInput, 'invalid-email'); // Invalid format
      await user.type(messageInput, 'Short'); // Too short
      
      await user.click(submitButton);
      
      expect(screen.getByTestId('name-error')).toHaveTextContent('Name must be at least 2 characters');
      expect(screen.getByTestId('email-error')).toHaveTextContent('Please enter a valid email address');
      expect(screen.getByTestId('message-error')).toHaveTextContent('Message must be at least 10 characters');
    });

    test('clears errors when user starts typing', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Trigger validation error
      await user.click(submitButton);
      expect(screen.getByTestId('name-error')).toBeInTheDocument();
      
      // Start typing to clear error
      await user.type(nameInput, 'J');
      expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    });
  });

  // ⏰ ASYNC BEHAVIOR TESTING
  describe('Async Form Submission', () => {
    test('shows loading state during form submission', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      // Fill out valid form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.selectOptions(screen.getByLabelText(/subject/i), 'general');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message for the form.');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Submit form
      await user.click(submitButton);
      
      // Check loading state immediately
      expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      
      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    test('shows success message after successful submission', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      // Fill out valid form
      await user.type(screen.getByLabelText(/name/i), 'Jane Smith');
      await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
      await user.selectOptions(screen.getByLabelText(/subject/i), 'feedback');
      await user.type(screen.getByLabelText(/message/i), 'Great service! Keep up the good work.');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for success message using findBy (for async elements)
      const successMessage = await screen.findByTestId('success-message');
      expect(successMessage).toHaveTextContent('Thank you! Your message has been sent successfully.');
    });

    test('resets form after successful submission', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      // Fill and submit form
      await user.type(nameInput, 'Test User');
      await user.type(emailInput, 'test@example.com');
      await user.selectOptions(screen.getByLabelText(/subject/i), 'general');
      await user.type(messageInput, 'Test message content here.');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for success and check form is reset
      await screen.findByTestId('success-message');
      
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });

    test('handles submission errors', async () => {
      const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Network error'));
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockOnSubmit} />);
      
      // Fill out valid form
      await user.type(screen.getByLabelText(/name/i), 'Error Test');
      await user.type(screen.getByLabelText(/email/i), 'error@example.com');
      await user.selectOptions(screen.getByLabelText(/subject/i), 'support');
      await user.type(screen.getByLabelText(/message/i), 'This should trigger an error.');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for error message
      const errorMessage = await screen.findByTestId('error-message');
      expect(errorMessage).toHaveTextContent('Sorry, there was an error sending your message. Please try again.');
    });
  });

  // 🔄 RESET FUNCTIONALITY
  describe('Reset Functionality', () => {
    test('resets form when reset button is clicked', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'Reset Test');
      await user.type(screen.getByLabelText(/email/i), 'reset@example.com');
      await user.click(screen.getByLabelText(/subscribe to our newsletter/i));
      
      // Verify form has data
      expect(screen.getByLabelText(/name/i)).toHaveValue('Reset Test');
      expect(screen.getByLabelText(/subscribe to our newsletter/i)).toBeChecked();
      
      // Click reset
      await user.click(screen.getByRole('button', { name: /reset/i }));
      
      // Verify form is reset
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/subscribe to our newsletter/i)).not.toBeChecked();
    });
  });

  // 📸 SNAPSHOT TESTS - Different Form States
  describe('Lesson 2: Form State Snapshots', () => {
    test('captures empty form state', () => {
      render(<ContactForm />);
      const form = screen.getByTestId('contact-form');
      expect(form).toMatchSnapshot();
    });

    test('captures form with validation errors', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      // Trigger validation errors
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      const form = screen.getByTestId('contact-form');
      expect(form).toMatchSnapshot();
    });

    test('captures form with initial data', () => {
      const initialData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'Pre-filled message',
        newsletter: true
      };
      
      render(<ContactForm initialData={initialData} />);
      const form = screen.getByTestId('contact-form');
      expect(form).toMatchSnapshot();
    });
  });
}); 