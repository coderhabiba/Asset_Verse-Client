import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiLoginBoxLine } from 'react-icons/ri';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import Logo from '../../components/Logo/Logo';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext) ?? {};
  const isHR = user?.role === 'hr';
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsMenuOpen(false);
  };

  const getNavLinkClass = ({ isActive }) =>
    `md:w-auto w-full text-left px-4 py-2 rounded-lg transition duration-300 text-sm lg:text-[16px] font-medium block ${
      isActive
        ? 'bg-purple-700 text-white shadow-md'
        : 'text-gray-300 hover:text-white hover:bg-[#342757]'
    }`;

  const getAuthButtonClass = (isLogin = true) =>
    `flex items-center w-auto px-5 py-2 font-bold rounded-full transition duration-300 shadow-lg ${
      isLogin
        ? 'bg-purple-700 text-white hover:bg-purple-600'
        : 'bg-red-600 text-white hover:bg-red-700'
    }`;

  const handleLogOut = async () => {
    try {
      closeMenu();
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const PublicMenuLinks = (
    <>
      <NavLink onClick={closeMenu} className={getNavLinkClass} to="/">
        Home
      </NavLink>
      <NavLink
        onClick={closeMenu}
        className={getNavLinkClass}
        to="/join-employee"
      >
        Join as Employee
      </NavLink>
      <NavLink onClick={closeMenu} className={getNavLinkClass} to="/join-hr">
        Join as HR Manager
      </NavLink>
    </>
  );

  const dashboardLinks = (
    <>
      {isHR ? (
        // HR links
        <>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/hr-dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/hr-dashboard/assets"
            >
              Asset List
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/hr-dashboard/add-asset"
            >
              Add Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/hr-dashboard/requests"
            >
              All Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/hr-dashboard/employees"
            >
              Employee List
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/hr-profile"
            >
              Profile
            </NavLink>
          </li>
        </>
      ) : (
        // employee
        <>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/employee-dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/employee-dashboard/my-assets"
            >
              My Assets
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/employee-dashboard/my-team"
            >
              My Team
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/employee-dashboard/request-asset"
            >
              Request Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={getNavLinkClass}
              to="/employee-dashboard/profile"
            >
              Profile
            </NavLink>
          </li>
        </>
      )}
      <li className="mt-2 pt-2 border-t border-purple-900/50">
        <button
          onClick={handleLogOut}
          className="w-full text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition duration-300 flex items-center justify-center gap-2"
        >
          Logout
        </button>
      </li>
    </>
  );

  return (
    <header className="bg-[#191925] text-white shadow-xl border-b border-[#2B233D] sticky top-0 z-50">
      <div className="max-w-[95%] lg:max-w-[90%] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* pc navlink public */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {!user && PublicMenuLinks}
          </nav>

          {/* right */}
          <div className="flex items-center space-x-4">
            {!user && (
              <NavLink className={getAuthButtonClass(true)} to="/login">
                <RiLoginBoxLine className="mr-2" size={20} />
                Login
              </NavLink>
            )}

            {user && (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="p-1 cursor-pointer transition duration-300 flex items-center hover:bg-[#2B233D] rounded-full pr-3"
                >
                  <div className="relative">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-600 p-0.5"
                        alt="profile"
                      />
                    ) : (
                      <FaUserCircle size={38} className="text-purple-400" />
                    )}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#191925] rounded-full"></span>
                  </div>
                  <span className="text-sm font-semibold text-gray-200 ml-3 hidden lg:inline-block max-w-[120px] truncate">
                    {user.displayName || 'User'}
                  </span>
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-3 shadow-2xl bg-[#1e1e2d] rounded-2xl w-64 mt-4 space-y-1 border border-purple-800/30 backdrop-blur-md"
                >
                  <div className="px-4 py-3 mb-2 border-b border-purple-900/50">
                    <p className="text-xs text-purple-400 font-medium">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold truncate text-gray-100">
                      {user.email}
                    </p>
                  </div>
                  {dashboardLinks}
                </ul>
              </div>
            )}

            {/* mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 hover:text-white focus:outline-none rounded-lg hover:bg-purple-700/50 transition"
              >
                {isMenuOpen ? (
                  <FaTimes size={24} />
                ) : (
                  <FaBars size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#1e1e2d] pb-6 px-4 border-t border-purple-900 shadow-2xl"
          >
            <ul className="flex flex-col space-y-3 mt-4">
              {user ? (
                dashboardLinks
              ) : (
                <div className="flex flex-col space-y-2">
                  {PublicMenuLinks}
                  <div className="pt-4">
                    <NavLink
                      onClick={closeMenu}
                      className={getAuthButtonClass(true)}
                      to="/login"
                    >
                      <RiLoginBoxLine className="mr-2" size={20} />
                      Login
                    </NavLink>
                  </div>
                </div>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
