import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

interface AsyncLoaderProps {
  loadDelay?: number;
  shouldError?: boolean;
  initialData?: User[];
}

const AsyncLoader: React.FC<AsyncLoaderProps> = ({ 
  loadDelay = 1000, 
  shouldError = false,
  initialData 
}) => {
  const [users, setUsers] = useState<User[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, loadDelay));
      
      if (shouldError && retryCount <= 1) {
        throw new Error('Network error occurred');
      }
      
      // Simulate successful API response
      const mockUsers: User[] = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', company: 'TechCorp' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', company: 'DevCo' },
        { id: 3, name: 'Carol Davis', email: 'carol@example.com', company: 'CodeWorks' },
      ];
      
      setUsers(mockUsers);
      setError(null); // Clear error on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setTimeout(() => fetchUsers(), 100); // Small delay to see updated count
  };

  const handleRefresh = () => {
    setRetryCount(0);
    fetchUsers();
  };

  const handleLoadMore = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUsers: User[] = [
        { id: users.length + 1, name: 'David Wilson', email: 'david@example.com', company: 'NewTech' },
        { id: users.length + 2, name: 'Eva Brown', email: 'eva@example.com', company: 'FutureCorp' },
      ];
      
      setUsers(prev => [...prev, ...newUsers]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchUsers();
    }
  }, []);

  // Loading state
  if (loading && users.length === 0) {
    return (
      <div className="async-loader" data-testid="async-loader">
        <div 
          className="loading-spinner" 
          data-testid="loading-spinner"
          role="status"
          aria-label="Loading users"
        >
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && users.length === 0) {
    return (
      <div className="async-loader" data-testid="async-loader">
        <div 
          className="error-state" 
          data-testid="error-state"
          role="alert"
        >
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            onClick={handleRetry}
            className="btn btn-primary"
            data-testid="retry-button"
          >
            Retry ({retryCount}/3)
          </button>
        </div>
      </div>
    );
  }

  // Success state with data
  return (
    <div className="async-loader" data-testid="async-loader">
      <div className="users-header">
        <h2>Users Directory</h2>
        <button 
          onClick={handleRefresh}
          className="btn btn-secondary"
          disabled={loading}
          data-testid="refresh-button"
          aria-label="Refresh users list"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div 
          className="error-banner" 
          role="alert"
          data-testid="error-banner"
        >
          Error: {error}
        </div>
      )}

      <div className="users-list" role="list" aria-label="Users list">
        {users.map(user => (
          <div 
            key={user.id} 
            className="user-item"
            role="listitem"
            data-testid={`user-item-${user.id}`}
          >
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-company">{user.company}</p>
            </div>
            <button 
              className="btn btn-small"
              aria-label={`View details for ${user.name}`}
              data-testid={`view-details-${user.id}`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="users-footer">
        <p>
          Showing {users.length} users
        </p>
        <button 
          onClick={handleLoadMore}
          disabled={loading}
          className="btn btn-primary"
          data-testid="load-more-button"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>

      {loading && users.length > 0 && (
        <div 
          className="loading-overlay"
          data-testid="loading-overlay"
          role="status"
          aria-label="Loading more users"
        >
          Loading more users...
        </div>
      )}
    </div>
  );
};

export default AsyncLoader; 