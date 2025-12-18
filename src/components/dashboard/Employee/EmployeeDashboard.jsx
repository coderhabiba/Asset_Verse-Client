import { useContext, useState } from 'react';
import { useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  HiMenuAlt2,
  HiX,
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineUserCircle,
  HiOutlineLogout,
} from 'react-icons/hi';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logOut, user } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/employee-dashboard/my-assets',
      label: 'My Assets',
      icon: <HiOutlineHome size={22} />,
    },
    {
      path: '/employee-dashboard/req-asset',
      label: 'Request Asset',
      icon: <HiOutlineClipboardList size={22} />,
    },
    {
      path: '/employee-dashboard/my-team',
      label: 'My Team',
      icon: <HiOutlineUsers size={22} />,
    },
    {
      path: '/employee-dashboard/profile',
      label: 'Profile',
      icon: <HiOutlineUserCircle size={22} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f111a] text-gray-300 font-sans">
      {/* --- Mobile Overlay --- */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- Sidebar --- */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#161926] border-r border-white/5 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 text-white font-black text-xl">
              E
            </div>
            <div>
              <h1 className="text-white font-black tracking-tight leading-none text-lg">
                EMP-FLOW
              </h1>
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">
                Dashboard
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {menuItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium
                  ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'
                  }
                `}
              >
                <span className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Profile Info */}
          <div className="p-4 mt-auto">
            <div className="bg-[#0f111a]/50 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/40'}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/30"
                  alt="User"
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">
                    {user?.displayName || 'Employee'}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
              >
                <HiOutlineLogout size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-[#161926]/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"
            >
              <HiMenuAlt2 size={24} />
            </button>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              {menuItems.find(m => location.pathname === m.path)?.label ||
                'Overview'}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
            <span className="hidden sm:inline bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20 uppercase">
              Active Session
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#0f111a] custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
