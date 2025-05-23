import React from 'react';

interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
  role?: 'admin' | 'user' | 'guest';
  isOnline?: boolean;
  bio?: string;
  showActions?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  avatar,
  role = 'user',
  isOnline = false,
  bio,
  showActions = true
}) => {
  const handleEdit = () => {
    console.log('Edit user:', name);
  };

  const handleDelete = () => {
    console.log('Delete user:', name);
  };

  const handleMessage = () => {
    console.log('Message user:', name);
  };

  return (
    <div className="user-card" data-testid="user-card">
      <div className="user-card__header">
        {avatar ? (
          <img 
            src={avatar} 
            alt={`${name}'s profile picture`}
            className="user-card__avatar"
          />
        ) : (
          <div 
            className="user-card__avatar-placeholder"
            title="No profile picture"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div className="user-card__info">
          <h2 className="user-card__name">{name}</h2>
          <p className="user-card__email">{email}</p>
          
          <div className="user-card__status">
            <span 
              className={`status-indicator ${isOnline ? 'online' : 'offline'}`}
              aria-label={isOnline ? 'User is online' : 'User is offline'}
            />
            <span className="status-text">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <span 
            className={`user-card__role role-${role}`}
            role="status"
            aria-label={`User role: ${role}`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        </div>
      </div>

      {bio && (
        <div className="user-card__bio">
          <h3>About</h3>
          <p>{bio}</p>
        </div>
      )}

      {showActions && (
        <div className="user-card__actions" role="group" aria-label="User actions">
          <button 
            onClick={handleEdit}
            className="btn btn-primary"
            aria-label={`Edit ${name}'s profile`}
          >
            Edit
          </button>
          
          <button 
            onClick={handleMessage}
            className="btn btn-secondary"
            aria-label={`Send message to ${name}`}
          >
            Message
          </button>
          
          {role === 'admin' && (
            <button 
              onClick={handleDelete}
              className="btn btn-danger"
              aria-label={`Delete ${name}'s account`}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard; 