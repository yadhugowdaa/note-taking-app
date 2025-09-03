import React from 'react';
import styles from './CustomButton.module.css';

interface CustomButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?: 'primary' | 'google';
  type?: 'button' | 'submit';
  href?: string; // Add href prop to allow the button to be a link
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children, variant = 'primary', type = 'button', href }) => {
  const variantStyle = variant === 'primary' ? styles.buttonPrimary : styles.buttonGoogle;

  // If an href is provided, render an anchor tag styled as a button
  if (href) {
    return (
      <a href={href} className={`${styles.button} ${variantStyle}`}>
        {children}
      </a>
    );
  }

  // Otherwise, render a normal button
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${variantStyle}`}>
      {children}
    </button>
  );
};

export default CustomButton;

