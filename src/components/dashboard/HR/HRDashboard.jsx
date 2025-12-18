import { useContext, useState, useEffect } from 'react';
import {
  HiMenu,
  HiX,
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
            color: 'from-purple-600 to-pink-600',
            path: '/hr-dashboard/employees',
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden bg-secondary border border-white/5 rounded-2xl p-6 shadow-xl group`}
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}
            />
            <h2 className="text-gray-400 font-medium mb-1">{item.title}</h2>
            <p className="text-3xl font-bold text-white mb-6 tracking-tight">
              {item.value}
            </p>
            <button
              onClick={() => navigate(item.path)}
              className="text-sm font-semibold text-white/80 hover:text-white flex items-center gap-2 transition-all"
            >
              Explore Details{' '}
              <span className="group-hover:translate-x-1 transition-transform">
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f111a] text-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#161926]/80 backdrop-blur-xl border-r border-white/5 transform flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out`}
      >
        <div className="p-8">
          <Logo />
        </div>

        <nav className="px-4 space-y-2">
          {tabs.map(item => (
            <button
              key={item.key}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.key
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon
                size={22}
                className={
                  activeTab === item.key ? 'text-white' : 'text-purple-500'
                }
              />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.key && (
                <motion.div
                  layoutId="pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-[#0f111a]/50 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user?.companyLogo}
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/30"
                alt="User"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">
                  {user?.name || 'HR Manager'}
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
      </aside>

      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto custom-scrollbar">
        <header className="sticky top-0 z-40 bg-[#0f111a]/80 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-white/5">
          <button
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu size={28} />
          </button>

          <h1 className="text-xl font-bold tracking-tight">
            {activeTab === 'dashboard'
              ? 'Overview'
              : tabs.find(t => t.key === activeTab)?.label}
          </h1>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-white">
                {user?.displayName || 'HR Manager'}
              </span>
              <span className="text-[10px] text-purple-400 uppercase tracking-widest font-black">
                Pro Member
              </span>
            </div>
            <div className="relative group">
              <img
                src={user?.photoURL || 'https://i.ibb.co/8LQPQJ6s/user.png'}
                className="w-8 h-8 cursor-pointer"
                alt="profile"
              />
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabComponents[activeTab] ? tabComponents[activeTab]() : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HRDashboard;
