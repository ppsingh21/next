// src/components/Category.tsx
import React, { useState } from 'react';
import Button from '../../components/Button';

interface CategoryType {
  _id: string;
  cName: string;
}

interface CategoryProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categories: CategoryType[];
}

const Category: React.FC<CategoryProps> = ({ handleChange, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
    handleChange(event);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );
  const [isDropdownVisible, setIsDropdownVisible] =
    useState<boolean>(!isMobile);
  
  return (
    <div className="pb-4">
      <h2 className="text-xl pb-4 cursor-pointer" onClick={toggleDropdown}>
        Categories {isMobile && (isDropdownVisible ? '▲' : '▼')}
      </h2>
      {(isDropdownVisible || !isMobile) && (
        <>
      <label className="sidebar-label-container">
        <input
          onChange={handleInputChange}
          type="radio"
          value="all"
          name="category"
          checked={selectedCategory === 'all'}
        />
        <span className="checkmark"></span>All
      </label>
      {categories.map((category) => (
        <div key={category._id}>
          <Button
            title={category.cName}
            name="category"
            value={category._id}
            handleChange={handleInputChange}
            color="blue" // Replace with appropriate color logic if needed
            checked={selectedCategory === category._id}
          />
        </div>
      ))}
      </>
    )}
    </div>
  );
};

export default Category;
