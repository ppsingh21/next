// src/components/Input.tsx
import React from 'react';

interface InputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  title: string;
  name: string;
  color?: string | 'blue';
}

const Input: React.FC<InputProps> = ({
  handleChange,
  value,
  title,
  name,
  color,
}) => {
  return (
    <label className="sidebar-label-container">
      <input onChange={handleChange} type="radio" value={value} name={name} />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {title}
    </label>
  );
};

export default Input;
