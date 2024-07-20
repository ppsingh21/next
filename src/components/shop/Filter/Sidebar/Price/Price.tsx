// src/components/Price.tsx
import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';

interface PriceProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Price: React.FC<PriceProps> = ({ handleChange }) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );
  const [isDropdownVisible, setIsDropdownVisible] =
    useState<boolean>(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsDropdownVisible(!mobile); // Show dropdown by default on desktop, hide on mobile
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="pb-4">
      <h2 className="text-xl pb-4 cursor-pointer" onClick={toggleDropdown}>
        Price Range {isMobile && (isDropdownVisible ? '▲' : '▼')}
      </h2>

      {(isDropdownVisible || !isMobile) && (
        <div className="flex flex-col">
          <label className="sidebar-label-container">
            <input
              onChange={handleChange}
              type="radio"
              value="all"
              name="price"
            />
            <span className="checkmark"></span>All
          </label>
          <Input
            handleChange={handleChange}
            value="0-500000"
            title="0 - Rs.5 Lakhs"
            name="price"
          />
          <Input
            handleChange={handleChange}
            value="500000-1000000"
            title="Rs.5 Lakhs - Rs.10 Lakhs"
            name="price"
          />
          <Input
            handleChange={handleChange}
            value="1000000-1500000"
            title="Rs.10 Lakhs - Rs.15 Lakhs"
            name="price"
          />
          <Input
            handleChange={handleChange}
            value="1500000-2000000"
            title="Rs.15 Lakhs - Rs.20 Lakhs"
            name="price"
          />
          <Input
            handleChange={handleChange}
            value="2000000-"
            title="Over Rs.20 Lakhs"
            name="price"
          />
        </div>
      )}
    </div>
  );
};

export default Price;
