import React from 'react';
import styles from './CustomButton.module.css';

interface CustomButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode; // This allows text inside the button
  variant?: 'primary' | 'google';
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children, variant = 'primary' }) => {
  const variantStyle = variant === 'primary' ? styles.buttonPrimary : styles.buttonGoogle;

  return (
    <button onClick={onClick} className={`${styles.button} ${variantStyle}`}>
      {children}
    </button>
  );
};

export default CustomButton;