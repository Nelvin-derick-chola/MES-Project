import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, className = '', ...props }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
      {...props}
    />
  );
};