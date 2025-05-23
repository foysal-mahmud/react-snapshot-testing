import React from 'react';

interface BasicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const BasicButton: React.FC<BasicButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}) => {
  const className = `btn btn-${variant}${disabled ? ' btn-disabled' : ''}`;
  
  return (
    <button 
      className={className}
      onClick={onClick}
      disabled={disabled}
      data-testid="basic-button"
    >
      {children}
    </button>
  );
};

export default BasicButton; 