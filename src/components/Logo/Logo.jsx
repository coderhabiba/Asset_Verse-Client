import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiLoginBoxLine } from 'react-icons/ri';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiOutlineChevronDown } from 'react-icons/hi';
import Logo from '../../components/Logo/Logo';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext) || {};
  const isHR = user?.role === 'hr';
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userPhoto =
    user?.photo || user?.profileImage || user?.companyLogo || user?.photoURL;
  const userName = user?.name || user?.displayName || 'User';

  const closeMenu = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsMenuOpen(false);
  };

  const getNavLinkClass = ({ isActive }) =>
    `relative px-5 py-2.5 transition-all duration-300 text-sm font-bold tracking-wide rounded-xl ${
      isActive
        ? 'bg-purple-500/10 text-purple-400 shadow-[inset_0_0_20px_rgba(168,85,247,0.15)] border border-purple-500/20'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
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
    <div className="flex flex-col md:flex-row items-center gap-3">
      <NavLink onClick={closeMenu} className={getNavLinkClass} to="/">
        Home
      </NavLink>
      <NavLink
        onClick={closeMenu}
        className={getNavLinkClass}
        to="/join-employee"
      >
        Join Employee
      </NavLink>
      <NavLink onClick={closeMenu} className={getNavLinkClass} to="/join-hr">
        Join HR Manager
      </NavLink>
    </div>
  );

  const dashboardLinks = (
    <>
      {isHR ? (
        <>
          <li>
            <NavLink
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
              to="/hr-dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
              to="/hr-dashboard/assets"
            >
              Asset List
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
              to="/hr-dashboard/add-asset"
            >
              Add Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
              to="/hr-dashboard/requests"
            >
              All Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
              to="/hr-dashboard/employees"
            >
              Employee List
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
              to="/employee-dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
              to="/employee-dashboard/my-assets"
            >
              My Assets
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
              to="/employee-dashboard/my-team"
            >
              My Team
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
              to="/employee-dashboard/req-asset"
            >
              Request Asset
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          onClick={closeMenu}
          className="px-4 py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl block transition-all font-semibold"
          to={isHR ? '/hr-profile' : '/employee-dashboard/profile'}
        >
          Profile Info
        </NavLink>
      </li>
      <li className="mt-3 pt-3 border-t border-white/5 px-2">
        <button
          onClick={handleLogOut}
          className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-black transition-all duration-300 uppercase text-[10px] tracking-[0.2em]"
        >
          Sign Out System
        </button>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-[100] w-full bg-[#0B0F1A]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="shrink-0 transition-all duration-500 hover:brightness-125">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center">
          {!user && PublicMenuLinks}
        </nav>

        <div className="flex items-center gap-6">
          {!user && (
            <NavLink
              to="/login"
              className="relative group overflow-hidden px-7 py-2.5 rounded-xl bg-white text-black font-black text-sm transition-all duration-300 hover:pr-10 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <span className="uppercase tracking-widest">Login</span>
                <RiLoginBoxLine className="text-lg opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-xl transition-all duration-500 scale-110 group-hover:scale-100"></div>
            </NavLink>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="flex items-center gap-3 p-1 cursor-pointer bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="relative">
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500/20 group-hover:ring-purple-500 transition-all duration-500 p-0.5"
                      alt="user"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <FaUserCircle size={40} className="text-purple-500/80" />
                  )}
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-[3px] border-[#0B0F1A] rounded-full shadow-xl"></span>
                </div>
                <div className="hidden lg:block text-left pr-2">
                  <p className="text-xs font-black text-white truncate max-w-[110px] uppercase tracking-tighter">
                    {userName}
                  </p>
                  <p className="text-[9px] text-purple-500 font-black uppercase tracking-[0.15em]">
                    {user?.role || 'Member'}
                  </p>
                </div>
                <HiOutlineChevronDown className="text-gray-600 mr-2 group-hover:text-white transition-colors" />
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-[#0F1521] border border-white/10 rounded-[24px] w-72 mt-5 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-200"
              >
                <div className="px-4 py-4 mb-2 bg-gradient-to-br from-white/[0.05] to-transparent rounded-2xl border border-white/5">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">
                    Account Dashboard
                  </p>
                  <p className="text-sm font-bold text-white truncate">
                    {user?.email}
                  </p>
                </div>
                {dashboardLinks}
              </ul>
            </div>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center bg-white/5 text-gray-400 rounded-xl border border-white/10 hover:text-white transition-all"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#0B0F1A] border-t border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-5">
              {user ? (
                <ul className="space-y-1">{dashboardLinks}</ul>
              ) : (
                <div className="flex flex-col gap-4">
                  {PublicMenuLinks}
                  <NavLink
                    onClick={closeMenu}
                    className="w-full py-4 bg-white text-black font-black rounded-xl text-center uppercase tracking-[0.2em] text-xs shadow-xl"
                    to="/login"
                  >
                    Login to Portal
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
