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
      axiosSecure.get(`/analytics/${user.email}`)
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
  }, [user?.email]);

  const PIE_COLORS = ['#6366F1', '#F43F5E'];
  
  return (
    <div className="mt-10 mb-10 px-2">
      {/* header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-300 tracking-tight">
          Analytics Dashboard
        </h2>
        <p className="text-gray-400 mt-1">
          Real-time overview of your asset requests and inventory distribution.
        </p>
      </div>

      {isFetching && (
        <div className="flex items-center gap-2 mb-4 text-indigo-600 font-medium animate-pulse">
          <div className="loading loading-ring loading-xl text-primary"></div>
          Updating real-time data...
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* pie chart */}
        <div className="bg-secondary p-6 rounded-2xl shadow-sm border border-purple-900 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-400">
              Asset Composition
            </h3>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full uppercase">
              Inventory
            </span>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* bar chart */}
        <div className="bg-secondary p-6 rounded-2xl shadow-sm border border-purple-900 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-400">
              Most Requested Assets
            </h3>
            <span className="px-3 py-1 bg-violet-50 text-violet-600 text-xs font-semibold rounded-full uppercase">
              Top 5 Items
            </span>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={45}
                  isAnimationActive={false}
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
