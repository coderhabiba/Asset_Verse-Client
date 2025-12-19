import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  RiLoginBoxLine,
  RiLogoutBoxRLine,
  RiDashboardLine,
  RiUserLine,
} from 'react-icons/ri';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../components/Logo/Logo';

const Navbar = () => {
  const authData = useContext(AuthContext);
  const user = authData?.user;
  const logOut = authData?.logOut;
  const isHR = user?.role === 'hr';
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userPhoto =
    user?.photo || user?.profileImage || user?.companyLogo || user?.photoURL;
  const userName = user?.name || user?.displayName || 'User';

  const closeMenu = () => setIsMenuOpen(false);

  const getNavLinkClass = ({ isActive }) =>
    `relative px-4 py-2 transition-all duration-300 text-sm font-semibold tracking-wide flex items-center gap-2 rounded-xl ${
      isActive
        ? 'text-white bg-purple-600/20 shadow-[0_0_15px_rgba(147,51,234,0.3)] border border-purple-500/30'
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
    <div className="flex flex-col md:flex-row gap-2">
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
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/hr-dashboard"
          >
            <RiDashboardLine className="text-purple-500" /> Dashboard
          </NavLink>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/hr-dashboard/assets"
          >
            Asset List
          </NavLink>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/hr-dashboard/add-asset"
          >
            Add Asset
          </NavLink>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/hr-dashboard/requests"
          >
            All Requests
          </NavLink>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/hr-dashboard/employees"
          >
            Employees
          </NavLink>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/hr-profile"
          >
            <RiUserLine className="text-purple-500" /> Profile
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/employee-dashboard"
          >
            <RiDashboardLine className="text-purple-500" /> Dashboard
          </NavLink>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/employee-dashboard/my-assets"
          >
            My Assets
          </NavLink>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/employee-dashboard/my-team"
          >
            My Team
          </NavLink>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/employee-dashboard/req-asset"
          >
            Request Asset
          </NavLink>
          <NavLink
            onClick={closeMenu}
            className={getNavLinkClass}
            to="/employee-dashboard/profile"
          >
            <RiUserLine className="text-purple-500" /> Profile
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="bg-[#0D0D15]/80 backdrop-blur-xl text-white shadow-2xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
         
          <div className="flex-shrink-0">
            <Logo />
          </div>

         
          <nav className="hidden md:flex items-center">
            {!user && PublicMenuLinks}
          </nav>

          <div className="flex items-center gap-4">
            {/* লগইন বাটন */}
            {!user && (
              <NavLink
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300 active:scale-95"
                to="/login"
              >
                <RiLoginBoxLine size={20} /> Login
              </NavLink>
            )}

           
            {user && (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/10 group"
                >
                  <div className="relative">
                    {userPhoto ? (
                      <img
                        src={userPhoto}
                        className="w-10 h-10 rounded-xl object-cover border-2 border-purple-500/50 group-hover:border-purple-500 transition-all shadow-lg"
                        alt="profile"
                      />
                    ) : (
                      <FaUserCircle size={40} className="text-purple-400" />
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#0D0D15] rounded-full"></span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-bold text-white leading-tight">
                      {userName}
                    </p>
                    <p className="text-[10px] text-purple-400 font-medium uppercase tracking-wider">
                      {user?.role || 'Member'}
                    </p>
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content mt-4 p-2 shadow-2xl bg-[#161625] border border-white/10 rounded-2xl w-64 backdrop-blur-2xl"
                >
                  <div className="px-4 py-3 mb-2 border-b border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                      Signed in as
                    </p>
                    <p className="text-sm font-semibold truncate text-purple-300">
                      {user?.email}
                    </p>
                  </div>
                  <div className="space-y-1">{dashboardLinks}</div>
                  <div className="mt-2 pt-2 border-t border-white/5">
                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
                    >
                      <RiLogoutBoxRLine size={18} /> Logout
                    </button>
                  </div>
                </ul>
              </div>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 bg-white/5 text-gray-300 hover:text-white rounded-xl border border-white/10 transition-all"
              >
                {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

    
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#0D0D15] border-t border-white/5 shadow-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {user ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 mb-2">
                    Navigation
                  </p>
                  {dashboardLinks}
                  <button
                    onClick={handleLogOut}
                    className="w-full mt-4 flex items-center justify-center gap-2 p-4 bg-red-600/10 text-red-500 rounded-xl font-bold"
                  >
                    <RiLogoutBoxRLine size={20} /> Logout
                  </button>
                </div>
              ) : (
                <>
                  {PublicMenuLinks}
                  <NavLink
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-600/20"
                    to="/login"
                  >
                    <RiLoginBoxLine size={20} /> Login Now
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
