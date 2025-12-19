import { useContext, useState, useEffect } from 'react';
import {
  HiMenu,
  HiOutlineLogout,
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlinePlusCircle,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineLightningBolt,
  HiOutlineChartBar,
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AssetList from './AssetList/AssetList';
import AddAsset from './AddAsset/AddAsset';
import ReqPage from './ReqPage/ReqPage';
import EmployeeList from './EmployeeList/EmployeeList';
import UpgradePackage from './UpgradePackage/UpgradePackage';
import Analytics from './Analytics/Analytics';
import Logo from './../../Logo/Logo';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

const tabs = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/hr-dashboard',
    icon: HiOutlineViewGrid,
  },
  {
    key: 'assets',
    label: 'Asset List',
    path: '/hr-dashboard/assets',
    icon: HiOutlineCube,
  },
  {
    key: 'add',
    label: 'Add Asset',
    path: '/hr-dashboard/add-asset',
    icon: HiOutlinePlusCircle,
  },
  {
    key: 'requests',
    label: 'Requests',
    path: '/hr-dashboard/requests',
    icon: HiOutlineClipboardList,
  },
  {
    key: 'employees',
    label: 'Employees',
    path: '/hr-dashboard/employees',
    icon: HiOutlineUsers,
  },
  {
    key: 'upgrade',
    label: 'Upgrade',
    path: '/hr-dashboard/upgrade',
    icon: HiOutlineLightningBolt,
  },
  {
    key: 'analytics',
    label: 'Analytics',
    path: '/hr-dashboard/analytics',
    icon: HiOutlineChartBar,
  },
];

const HRDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    assets: 0,
    requests: 0,
    employeeCount: 0,
    employeeLimit: 5,
  });

  useEffect(() => {
    const currentPath = location.pathname;
    const foundTab = tabs.find(t => t.path === currentPath);
    if (foundTab) setActiveTab(foundTab.key);
    else if (currentPath === '/hr-dashboard/') setActiveTab('dashboard');
  }, [location.pathname]);

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      try {
        const [assetsRes, requestsRes, hrRes] = await Promise.all([
          axiosSecure.get(`/assets?hrEmail=${user.email}`),
          axiosSecure.get(`/requests/${user.email}`),
          axiosSecure.get(`/hr/stats/${user.email}`),
        ]);
        setStats({
          assets: assetsRes.data.assets?.length || 0,
          requests: requestsRes.data?.length || 0,
          employeeCount: parseInt(hrRes.data.currentEmployees) || 0,
          employeeLimit: parseInt(hrRes.data.packageLimit) || 5,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, [user, axiosSecure]);

  const tabComponents = {
    dashboard: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Total Assets',
            value: stats.assets,
            color: 'from-blue-600 to-indigo-600',
            path: '/hr-dashboard/assets',
          },
          {
            title: 'All Requests',
            value: stats.requests,
            color: 'from-emerald-500 to-teal-600',
            path: '/hr-dashboard/requests',
          },
          {
            title: 'Team Usage',
            value: `${stats.employeeCount} / ${stats.employeeLimit}`,
            color: 'from-purple-600 to-blue-600',
            path: '/hr-dashboard/employees',
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="relative overflow-hidden bg-[#161926] border border-white/5 rounded-3xl p-8 shadow-2xl group"
          >
            <div
              className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${item.color} opacity-5 blur-[80px] group-hover:opacity-20 transition-opacity`}
            />
            <h2 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">
              {item.title}
            </h2>
            <p className="text-4xl font-black text-white mb-8 tracking-tighter">
              {item.value}
            </p>
            <button
              onClick={() => navigate(item.path)}
              className="text-xs font-black uppercase tracking-widest text-purple-400 group-hover:text-white flex items-center gap-2 transition-all"
            >
              View Details{' '}
              <span className="group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
          </motion.div>
        ))}
      </div>
    ),
    assets: () => <AssetList />,
    add: () => <AddAsset />,
    requests: () => <ReqPage />,
    employees: () => <EmployeeList />,
    upgrade: () => <UpgradePackage />,
    analytics: () => <Analytics />,
  };

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0D0D15] text-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#11111D] border-r border-white/5 transform flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static transition-transform duration-500 ease-in-out`}
      >
        <div className="p-10">
          <Logo />
        </div>

        <nav className="px-6 space-y-1.5 flex-1">
          {tabs.map(item => (
            <button
              key={item.key}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                activeTab === item.key
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-900/20'
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon
                size={20}
                className={
                  activeTab === item.key
                    ? 'text-white'
                    : 'text-purple-500/70 group-hover:text-purple-400'
                }
              />
              <span className="font-bold text-sm tracking-wide">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-[#161926] rounded-3xl p-6 border border-white/5 shadow-inner">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src={user?.companyLogo || user?.photoURL}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-500/20 shadow-lg"
                  alt="User"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#161926] rounded-full" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black text-white truncate">
                  {user?.name || 'HR Manager'}
                </p>
                <p className="text-[10px] text-purple-400 uppercase font-black tracking-tighter">
                  Verified Admin
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-[10px] uppercase tracking-[0.2em]"
            >
              <HiOutlineLogout size={16} /> Secure Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto custom-scrollbar bg-[#0D0D15]">
        <header className="sticky top-0 z-40 bg-[#0D0D15]/80 backdrop-blur-2xl px-10 py-6 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <HiMenu size={24} />
            </button>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
              {activeTab === 'dashboard'
                ? 'Overview'
                : tabs.find(t => t.key === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest leading-none mb-1">
                Current Session
              </span>
              <span className="text-sm font-bold text-white leading-none">
                {new Date().toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl p-0.5 shadow-lg shadow-purple-600/20">
              <img
                src={user?.photoURL || 'https://i.ibb.co/8LQPQJ6s/user.png'}
                className="w-full h-full rounded-[14px] object-cover bg-[#0D0D15]"
                alt="profile"
              />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-400 mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'circOut' }}
            >
              {tabComponents[activeTab] ? tabComponents[activeTab]() : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HRDashboard;
