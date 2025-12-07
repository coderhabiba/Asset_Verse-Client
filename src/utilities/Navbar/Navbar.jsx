import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isHR = user?.role === 'hr';

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-gray-200"
        >
          AssetVerse
        </Link>

        {/* Public Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          {!user && (
            <Link to="/join-employee" className="hover:text-gray-200">
              Join as Employee
            </Link>
          )}
          {!user && (
            <Link to="/join-hr" className="hover:text-gray-200">
              Join as HR Manager
            </Link>
          )}
        </div>

        {/* Auth / User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 hover:bg-blue-500 px-3 py-1 rounded"
              >
                <img
                  src={user.photoURL || 'https://via.placeholder.com/30'}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{user.name || user.email}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                  {isHR ? (
                    <>
                      <Link
                        to="/assets"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Asset List
                      </Link>
                      <Link
                        to="/add-asset"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Add Asset
                      </Link>
                      <Link
                        to="/requests"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        All Requests
                      </Link>
                      <Link
                        to="/employees"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Employee List
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/my-assets"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Assets
                      </Link>
                      <Link
                        to="/my-team"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Team
                      </Link>
                      <Link
                        to="/request-asset"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Request Asset
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-white rounded hover:bg-white hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 px-4 pb-4 space-y-2">
          <Link to="/" className="block text-white hover:text-gray-200">
            Home
          </Link>
          {!user && (
            <Link
              to="/join-employee"
              className="block text-white hover:text-gray-200"
            >
              Join as Employee
            </Link>
          )}
          {!user && (
            <Link
              to="/join-hr"
              className="block text-white hover:text-gray-200"
            >
              Join as HR Manager
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
