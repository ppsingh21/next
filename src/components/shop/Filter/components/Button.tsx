// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  title: string;
  name: string;
  color?: string | 'blue';
  checked: boolean;
}

const Button: React.FC<ButtonProps> = ({
  handleChange,
  value,
  title,
  name,
  color,
  checked,
}) => {
  return (
    <label className="sidebar-label-container">
      <input
        onChange={handleChange}
        type="radio"
        value={value}
        name={name}
        checked={checked}
      />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {title}
    </label>
  );
};

export default Button;
