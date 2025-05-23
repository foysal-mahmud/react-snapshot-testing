import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCard from './UserCard';

// Mock console.log to test function calls
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Lesson 2: UserCard Component - Query Methods Deep Dive', () => {
  
  const defaultProps = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  afterEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  // 🥇 QUERIES ACCESSIBLE TO EVERYONE
  describe('Priority 1: Accessibility-First Queries', () => {
    test('finds elements by role - the gold standard', () => {
      render(<UserCard {...defaultProps} role="admin" />);
      
      // Test heading by role
      const heading = screen.getByRole('heading', { name: /john doe/i });
      expect(heading).toBeInTheDocument();
      
      // Test buttons by role with specific names
      const editButton = screen.getByRole('button', { name: /edit john doe's profile/i });
      const messageButton = screen.getByRole('button', { name: /send message to john doe/i });
      const deleteButton = screen.getByRole('button', { name: /delete john doe's account/i });
      
      expect(editButton).toBeInTheDocument();
      expect(messageButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
      
      // Test group role
      const actionGroup = screen.getByRole('group', { name: /user actions/i });
      expect(actionGroup).toBeInTheDocument();
      
      // Test status role
      const roleStatus = screen.getByRole('status', { name: /user role: admin/i });
      expect(roleStatus).toBeInTheDocument();
    });

    test('demonstrates role queries with different roles', () => {
      const { rerender } = render(<UserCard {...defaultProps} role="user" />);
      
      // Regular user should not have delete button
      expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
      
      // Rerender as admin
      rerender(<UserCard {...defaultProps} role="admin" />);
      
      // Admin should have delete button
      expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    });

    test('finds elements by label text (forms would use this)', () => {
      render(<UserCard {...defaultProps} />);
      
      // While this component doesn't have form labels, we test aria-label
      const statusIndicator = screen.getByLabelText(/user is offline/i);
      expect(statusIndicator).toBeInTheDocument();
    });
  });

  // 🥈 SEMANTIC QUERIES
  describe('Priority 2: Semantic Queries', () => {
    test('finds images by alt text', () => {
      render(
        <UserCard 
          {...defaultProps} 
          avatar="https://example.com/avatar.jpg" 
        />
      );
      
      const avatarImage = screen.getByAltText(/john doe's profile picture/i);
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    test('finds elements by title attribute', () => {
      render(<UserCard {...defaultProps} />); // No avatar = placeholder with title
      
      const avatarPlaceholder = screen.getByTitle(/no profile picture/i);
      expect(avatarPlaceholder).toBeInTheDocument();
      expect(avatarPlaceholder).toHaveTextContent('J'); // First letter of John
    });
  });

  // 🥉 TEST IDS (LAST RESORT)
  describe('Priority 3: Test IDs (When Nothing Else Works)', () => {
    test('finds container by test id', () => {
      render(<UserCard {...defaultProps} />);
      
      const userCard = screen.getByTestId('user-card');
      expect(userCard).toBeInTheDocument();
      expect(userCard).toHaveClass('user-card');
    });
  });

  // 🔍 QUERY TYPES: getBy vs queryBy vs findBy
  describe('Query Types: getBy vs queryBy vs findBy', () => {
    test('getBy - throws error if element not found', () => {
      render(<UserCard {...defaultProps} showActions={false} />);
      
      // This will find the element
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      
      // This would throw an error (uncomment to see):
      // expect(() => screen.getByText('Delete')).toThrow();
    });

    test('queryBy - returns null if element not found', () => {
      render(<UserCard {...defaultProps} showActions={false} />);
      
      // This will return null, not throw
      const deleteButton = screen.queryByRole('button', { name: /delete/i });
      expect(deleteButton).not.toBeInTheDocument();
      
      // Test conditional rendering
      const actions = screen.queryByRole('group', { name: /user actions/i });
      expect(actions).not.toBeInTheDocument();
    });

    test('conditional rendering based on props', () => {
      const { rerender } = render(<UserCard {...defaultProps} bio={undefined} />);
      
      // No bio section initially
      expect(screen.queryByText('About')).not.toBeInTheDocument();
      
      // Add bio
      rerender(<UserCard {...defaultProps} bio="Software developer with 5 years experience" />);
      
      // Bio section should now appear
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText(/software developer/i)).toBeInTheDocument();
    });
  });

  // 👆 USER INTERACTIONS
  describe('User Interactions with userEvent', () => {
    test('handles button clicks', async () => {
      const user = userEvent.setup();
      render(<UserCard {...defaultProps} role="admin" />);
      
      // Click edit button
      await user.click(screen.getByRole('button', { name: /edit/i }));
      expect(consoleSpy).toHaveBeenCalledWith('Edit user:', 'John Doe');
      
      // Click message button
      await user.click(screen.getByRole('button', { name: /message/i }));
      expect(consoleSpy).toHaveBeenCalledWith('Message user:', 'John Doe');
      
      // Click delete button
      await user.click(screen.getByRole('button', { name: /delete/i }));
      expect(consoleSpy).toHaveBeenCalledWith('Delete user:', 'John Doe');
    });

    test('keyboard navigation works', async () => {
      const user = userEvent.setup();
      render(<UserCard {...defaultProps} />);
      
      const editButton = screen.getByRole('button', { name: /edit/i });
      
      // Tab to the button and press Enter
      await user.tab();
      expect(editButton).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(consoleSpy).toHaveBeenCalledWith('Edit user:', 'John Doe');
    });
  });

  // 📊 DIFFERENT COMPONENT STATES
  describe('Component State Variations', () => {
    test('renders different user roles correctly', () => {
      const roles: Array<'admin' | 'user' | 'guest'> = ['admin', 'user', 'guest'];
      
      roles.forEach(role => {
        const { unmount } = render(<UserCard {...defaultProps} role={role} />);
        
        const roleElement = screen.getByText(role.charAt(0).toUpperCase() + role.slice(1));
        expect(roleElement).toBeInTheDocument();
        expect(roleElement).toHaveClass(`role-${role}`);
        
        unmount(); // Clean up for next iteration
      });
    });

    test('renders online/offline status correctly', () => {
      const { rerender } = render(<UserCard {...defaultProps} isOnline={false} />);
      
      // Test offline state
      expect(screen.getByLabelText(/user is offline/i)).toBeInTheDocument();
      expect(screen.getByText('Offline')).toBeInTheDocument();
      
      // Test online state
      rerender(<UserCard {...defaultProps} isOnline={true} />);
      expect(screen.getByLabelText(/user is online/i)).toBeInTheDocument();
      expect(screen.getByText('Online')).toBeInTheDocument();
    });
  });

  // 📸 SNAPSHOT TESTS - Building on Lesson 1 knowledge
  describe('Lesson 2: Advanced Snapshot Testing', () => {
    test('captures user card with minimal props', () => {
      render(<UserCard {...defaultProps} />);
      const userCard = screen.getByTestId('user-card');
      expect(userCard).toMatchSnapshot();
    });

    test('captures user card with all features', () => {
      render(
        <UserCard 
          name="Alice Johnson"
          email="alice@example.com"
          avatar="https://example.com/alice.jpg"
          role="admin"
          isOnline={true}
          bio="Senior developer and team lead with expertise in React and TypeScript."
          showActions={true}
        />
      );
      const userCard = screen.getByTestId('user-card');
      expect(userCard).toMatchSnapshot();
    });

    test('captures user card without actions', () => {
      render(<UserCard {...defaultProps} showActions={false} />);
      const userCard = screen.getByTestId('user-card');
      expect(userCard).toMatchSnapshot();
    });

    test('captures guest user card', () => {
      render(
        <UserCard 
          {...defaultProps}
          role="guest"
          isOnline={false}
        />
      );
      const userCard = screen.getByTestId('user-card');
      expect(userCard).toMatchSnapshot();
    });
  });
}); 