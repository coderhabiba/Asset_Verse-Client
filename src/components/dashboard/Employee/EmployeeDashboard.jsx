import { useContext, useState } from 'react';
import { useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  HiMenuAlt2,
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiBell,
  HiSearch,
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
    <div className="flex min-h-screen bg-[#09090b] text-zinc-400 font-sans selection:bg-indigo-500/30">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0c0c0e] border-r border-white/5 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`}
      >
        <div className="h-full flex flex-col">
          <div className="p-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/10 text-white font-black text-xl">
                  E
                </div>
              </div>
              <div>
                <h1 className="text-white font-black tracking-tighter text-xl italic">
                  EMP<span className="text-indigo-500">FLOW</span>
                </h1>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">
                    Enterprise
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 mb-4">
            <div className="relative group">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs font-bold outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar">
            <p className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">
              Main Menu
            </p>
            {menuItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  relative group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm
                  ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'hover:bg-white/[0.03] text-zinc-500 hover:text-zinc-200'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`transition-transform duration-300 ${
                        isActive
                          ? 'scale-110 text-indigo-500'
                          : 'group-hover:scale-110 group-hover:text-zinc-200'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-6">
            <div className="bg-zinc-900/40 rounded-4xl p-5 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <HiOutlineUserCircle size={60} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative">
                    <img
                      src={user?.photoURL || user?.profileImage}
                      className="w-11 h-11 rounded-2xl object-cover border border-white/10"
                      alt="User"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0c0c0e] rounded-full"></div>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-black text-white truncate leading-tight">
                      {user?.displayName || user?.name || 'Employee'}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-bold truncate tracking-tight uppercase">
                      {user?.role || 'Staff Member'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-black text-[10px] uppercase tracking-widest border border-white/5"
                >
                  <HiOutlineLogout size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 text-zinc-400 hover:text-white bg-white/5 rounded-xl border border-white/5 transition-all"
            >
              <HiMenuAlt2 size={22} />
            </button>
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-white uppercase tracking-tighter italic">
                {menuItems.find(m => location.pathname === m.path)?.label ||
                  'Overview'}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  Workspace
                </span>
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest px-2 py-0.5 bg-indigo-500/10 rounded">
                  v2.0.4
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 text-zinc-500 hover:text-indigo-400 transition-colors relative">
              <HiBell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#09090b]"></span>
            </button>
            <div className="h-8 w-px bg-white/5 mx-2 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-3 pl-2">
              <div className="text-right">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">
                  System Status
                </p>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">
                  Operational
                </p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#09090b] relative custom-scrollbar">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
