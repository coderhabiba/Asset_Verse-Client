import { useContext, useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from './../../../../context/AuthContext/AuthContext';

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/analytics/${user.email}`)
        .then(res => {
          setPieData([
            { name: 'Returnable', value: res.data.returnableCount || 0 },
            { name: 'Non-returnable', value: res.data.nonReturnableCount || 0 },
          ]);
          setBarData(res.data.topRequested || []);
          setIsFetching(false);
        })
        .catch(err => {
          console.error('API Error:', err);
          setIsFetching(false);
        });
    }
  }, [user?.email, axiosSecure]);

  const PIE_COLORS = ['#6366F1', '#10B981']; // Indigo & Emerald

  return (
    <div className="mt-6 mb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Asset Analytics
          </h2>
          <p className="text-gray-500 font-medium mt-1">
            Real-time data visualization of inventory and requests.
          </p>
        </div>

        {isFetching && (
          <div className="flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 text-xs font-black uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            Syncing Data...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Card */}
        <div className="bg-[#161926] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl group hover:border-indigo-500/30 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Composition
            </h3>
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <span className="text-[10px] font-black uppercase">Types</span>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={115}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D0D15',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                    color: '#fff',
                  }}
                  itemStyle={{
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={value => (
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-widest ml-2">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-[#161926] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl group hover:border-emerald-500/30 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Popularity
            </h3>
            <div className="px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-400">
              <span className="text-[10px] font-black uppercase tracking-tighter">
                Top Requests
              </span>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 10, left: -20, bottom: 40 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="0"
                  vertical={false}
                  stroke="rgba(255,255,255,0.03)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 'bold' }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 10 }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{
                    backgroundColor: '#0D0D15',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#barGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
