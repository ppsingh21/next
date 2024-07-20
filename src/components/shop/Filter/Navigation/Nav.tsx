// src/components/Nav.tsx
import React from 'react';

interface NavProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
}

const Nav: React.FC<NavProps> = ({ handleInputChange, query }) => {
  return (
    <nav
      style={{ width: '100%' }}
      className="flex justify-center items-center px-2"
    >
      <div
        className="nav-container"
        style={{ width: '100%', margin: '0 auto' }}
      >
        <input
          style={{ width: '100%' }}
          className="p-2 border border-gray-300 bg-gray-200 rounded-md"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Search Products"
        />
      </div>
    </nav>
  );
};

export default Nav;
