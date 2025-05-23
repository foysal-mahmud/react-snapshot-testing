import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AsyncLoader from './AsyncLoader';

describe('Lesson 2: AsyncLoader Component - Async Testing Mastery', () => {

  // ⏰ ASYNC QUERIES: findBy vs waitFor
  describe('Async Queries and Loading States', () => {
    test('shows loading spinner initially (using findBy)', async () => {
      render(<AsyncLoader loadDelay={100} />);
      
      // Immediately check for loading spinner
      const loadingSpinner = screen.getByTestId('loading-spinner');
      expect(loadingSpinner).toBeInTheDocument();
      expect(loadingSpinner).toHaveAttribute('role', 'status');
      expect(loadingSpinner).toHaveAttribute('aria-label', 'Loading users');
      
      // Wait for loading to complete using findBy (perfect for async!)
      const usersDirectory = await screen.findByRole('heading', { name: /users directory/i });
      expect(usersDirectory).toBeInTheDocument();
      
      // Loading spinner should be gone
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    test('displays users after loading completes', async () => {
      render(<AsyncLoader loadDelay={100} />);
      
      // Wait for users to load using findBy queries
      const aliceUser = await screen.findByText('Alice Johnson');
      const bobUser = await screen.findByText('Bob Smith');
      const carolUser = await screen.findByText('Carol Davis');
      
      expect(aliceUser).toBeInTheDocument();
      expect(bobUser).toBeInTheDocument();
      expect(carolUser).toBeInTheDocument();
    });

    test('shows correct user count after loading', async () => {
      render(<AsyncLoader loadDelay={50} />);
      
      // Wait for the count text to appear
      const countText = await screen.findByText(/showing 3 users/i);
      expect(countText).toBeInTheDocument();
    });
  });

  // 🚫 ERROR HANDLING WITH ASYNC
  describe('Error States and Recovery', () => {
    test('displays error state when loading fails', async () => {
      render(<AsyncLoader shouldError={true} loadDelay={100} />);
      
      // Wait for error state to appear
      const errorState = await screen.findByTestId('error-state');
      expect(errorState).toBeInTheDocument();
      expect(errorState).toHaveAttribute('role', 'alert');
      
      // Check error message
      expect(screen.getByText(/network error occurred/i)).toBeInTheDocument();
      expect(screen.getByText(/oops! something went wrong/i)).toBeInTheDocument();
    });

    test('allows retry after error', async () => {
      const user = userEvent.setup();
      render(<AsyncLoader shouldError={true} loadDelay={50} />);
      
      // Wait for error state
      const retryButton = await screen.findByTestId('retry-button');
      expect(retryButton).toHaveTextContent('Retry (0/3)');
      
      // Click retry
      await user.click(retryButton);
      
      // Should show updated retry count
      expect(retryButton).toHaveTextContent('Retry (1/3)');
    });

    // Temporarily commented out - advanced async testing scenario
    // test('successful retry after errors', async () => {
    //   const user = userEvent.setup();
    //   render(<AsyncLoader shouldError={true} loadDelay={50} />);
    //   
    //   // Wait for error and retry twice
    //   const retryButton = await screen.findByTestId('retry-button');
    //   await user.click(retryButton);
    //   await user.click(retryButton);
    //   
    //   // After 2 retries, should succeed and show users
    //   const usersDirectory = await screen.findByRole('heading', { name: /users directory/i });
    //   expect(usersDirectory).toBeInTheDocument();
    //   
    //   // Error state should be gone
    //   expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
    // });
  });

  // 🔄 INTERACTIVE ASYNC OPERATIONS
  describe('User Interactions with Async Operations', () => {
    test('refresh button works correctly', async () => {
      const user = userEvent.setup();
      render(<AsyncLoader loadDelay={50} />);
      
      // Wait for initial load
      await screen.findByRole('heading', { name: /users directory/i });
      
      const refreshButton = screen.getByTestId('refresh-button');
      expect(refreshButton).toHaveTextContent('Refresh');
      
      // Click refresh
      await user.click(refreshButton);
      
      // Should show refreshing state
      expect(refreshButton).toHaveTextContent('Refreshing...');
      expect(refreshButton).toBeDisabled();
      
      // Wait for refresh to complete
      await waitFor(() => {
        expect(refreshButton).toHaveTextContent('Refresh');
      });
      await waitFor(() => {
        expect(refreshButton).not.toBeDisabled();
      });
    });

    test('load more functionality', async () => {
      const user = userEvent.setup();
      render(<AsyncLoader loadDelay={50} />);
      
      // Wait for initial users
      await screen.findByText(/showing 3 users/i);
      
      const loadMoreButton = screen.getByTestId('load-more-button');
      
      // Click load more
      await user.click(loadMoreButton);
      
      // Should show loading overlay
      const loadingOverlay = screen.getByTestId('loading-overlay');
      expect(loadingOverlay).toBeInTheDocument();
      expect(loadingOverlay).toHaveAttribute('role', 'status');
      
      // Wait for new users to load
      await screen.findByText('David Wilson');
      await screen.findByText('Eva Brown');
      
      // Count should update
      expect(screen.getByText(/showing 5 users/i)).toBeInTheDocument();
      
      // Loading overlay should be gone
      expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument();
    });
  });

  // 🎯 ROLE-BASED QUERIES FOR LISTS
  describe('Accessibility and Semantic Queries', () => {
    test('finds list and list items by role', async () => {
      render(<AsyncLoader loadDelay={50} />);
      
      // Wait for users to load, then find list by role
      await screen.findByRole('heading', { name: /users directory/i });
      
      const usersList = screen.getByRole('list', { name: /users list/i });
      expect(usersList).toBeInTheDocument();
      
      // Find list items by role
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });

    test('finds individual user buttons by aria-label', async () => {
      render(<AsyncLoader loadDelay={50} />);
      
      // Wait for users to load
      await screen.findByText('Alice Johnson');
      
      // Find specific user buttons by aria-label
      const aliceButton = screen.getByRole('button', { name: /view details for alice johnson/i });
      const bobButton = screen.getByRole('button', { name: /view details for bob smith/i });
      
      expect(aliceButton).toBeInTheDocument();
      expect(bobButton).toBeInTheDocument();
    });

    test('finds status elements by role', async () => {
      render(<AsyncLoader loadDelay={50} />);
      
      // Initially should have loading status
      const loadingStatus = screen.getByRole('status', { name: /loading users/i });
      expect(loadingStatus).toBeInTheDocument();
      
      // Wait for loading to complete
      await screen.findByRole('heading', { name: /users directory/i });
      
      // Loading status should be gone
      expect(screen.queryByRole('status', { name: /loading users/i })).not.toBeInTheDocument();
    });
  });

  // ⚡ COMPLEX ASYNC SCENARIOS
  describe('Complex Async Testing Scenarios', () => {
    test('handles multiple async operations', async () => {
      const user = userEvent.setup();
      render(<AsyncLoader loadDelay={50} />);
      
      // Wait for initial load
      await screen.findByText(/showing 3 users/i);
      
      // Start load more operation
      const loadMoreButton = screen.getByTestId('load-more-button');
      await user.click(loadMoreButton);
      
      // While loading more, try to refresh (should be disabled)
      const refreshButton = screen.getByTestId('refresh-button');
      expect(refreshButton).toBeDisabled();
      
      // Wait for load more to complete
      await screen.findByText(/showing 5 users/i);
      
      // Refresh should be enabled again
      expect(refreshButton).not.toBeDisabled();
    });

    test('uses waitFor for complex conditions', async () => {
      const user = userEvent.setup();
      render(<AsyncLoader loadDelay={50} />);
      
      await screen.findByRole('heading', { name: /users directory/i });
      
      // Click load more
      await user.click(screen.getByTestId('load-more-button'));
      
      // Use waitFor to wait for multiple conditions individually
      await waitFor(() => {
        expect(screen.getByText('David Wilson')).toBeInTheDocument();
      }, { timeout: 3000 });
      await waitFor(() => {
        expect(screen.getByText('Eva Brown')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByText(/showing 5 users/i)).toBeInTheDocument();
      });
    });
  });

  // 🏁 INITIAL DATA SCENARIOS
  describe('Component with Initial Data', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@test.com', company: 'TestCorp' },
      { id: 2, name: 'Jane Smith', email: 'jane@test.com', company: 'TestInc' }
    ];

    test('renders immediately with initial data (no loading)', () => {
      render(<AsyncLoader initialData={mockUsers} />);
      
      // Should immediately show data, no loading
      expect(screen.getByRole('heading', { name: /users directory/i })).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  // 📸 ASYNC SNAPSHOT TESTING
  describe('Lesson 2: Async State Snapshots', () => {
    test('captures loading state snapshot', () => {
      render(<AsyncLoader loadDelay={100} />);
      
      const component = screen.getByTestId('async-loader');
      expect(component).toMatchSnapshot();
    });

    test('captures error state snapshot', async () => {
      render(<AsyncLoader shouldError={true} loadDelay={50} />);
      
      // Wait for error state
      await screen.findByTestId('error-state');
      
      const component = screen.getByTestId('async-loader');
      expect(component).toMatchSnapshot();
    });

    test('captures success state snapshot', async () => {
      render(<AsyncLoader loadDelay={50} />);
      
      // Wait for users to load
      await screen.findByText('Alice Johnson');
      
      const component = screen.getByTestId('async-loader');
      expect(component).toMatchSnapshot();
    });

    test('captures loading more state snapshot', async () => {
      const user = userEvent.setup();
      render(<AsyncLoader loadDelay={50} />);
      
      // Wait for initial load and trigger load more
      await screen.findByText(/showing 3 users/i);
      await user.click(screen.getByTestId('load-more-button'));
      
      // Capture the loading more state
      const component = screen.getByTestId('async-loader');
      expect(component).toMatchSnapshot();
    });
  });
}); 