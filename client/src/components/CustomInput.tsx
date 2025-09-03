import React from 'react';
import styles from './CustomInput.module.css';

interface CustomInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; // Make placeholder optional
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, type, value, onChange, placeholder, disabled = false }) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;