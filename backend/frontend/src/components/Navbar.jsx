import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu'; // Assuming UserMenu handles the dropdown

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center text-2xl font-bold text-blue-400">
              Vaultify
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">Hello, {user.name}!</span>
                <UserMenu onLogout={onLogout} />
              </div>
            ) : (
              <div className="flex items-center">
                <Link to="/login" className="text-gray-600 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </Link>
                <Link to="/signup" className="ml-4 bg-blue-300 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-400">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
