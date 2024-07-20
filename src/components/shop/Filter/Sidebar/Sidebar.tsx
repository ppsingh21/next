// src/components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import Category from './Category/Category';
import Price from './Price/Price';

interface CategoryType {
  _id: string;
  cName: string;
}

interface SidebarProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categories: CategoryType[];
}

const Sidebar: React.FC<SidebarProps> = ({ handleChange, categories }) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      {isMobile && (
        <button
          className="toggle-button py-2 px-6 my-4 border border-gray-300 rounded-lg"
          onClick={toggleSidebar}
        >
          {isSidebarVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
      )}
      {isSidebarVisible && (
        <section className="sidebar my-4">
          <Category handleChange={handleChange} categories={categories} />
          <Price handleChange={handleChange} />
        </section>
      )}
    </>
  );
};

export default Sidebar;
