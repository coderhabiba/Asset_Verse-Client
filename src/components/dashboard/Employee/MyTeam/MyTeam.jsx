import { useEffect, useState, useContext } from 'react';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { AuthContext } from './../../../../context/AuthContext/AuthContext';
import { MdGroups, MdBusiness, MdCake, MdVerified } from 'react-icons/md';

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [company, setCompany] = useState('');
  const [hrEmail, setHrEmail] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCompany = async () => {
    try {
      const res = await axiosSecure.get(`/assigned-assets/${user.email}`);
      if (res.data.length > 0) {
        const first = res.data[0];
        setCompany(first.companyName || 'My Company');
        setHrEmail(first.hrEmail);
      }
    } catch (err) {
      console.error('Failed to load company info', err);
    }
  };

  const fetchTeamMembers = async email => {
    if (!email) return;
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/team-members/${email}`);
      setMembers(res.data);
    } catch (err) {
      console.error('Failed to load team', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyCompany();
    }
  }, [user]);

  useEffect(() => {
    if (hrEmail) {
      fetchTeamMembers(hrEmail);
    }
  }, [hrEmail]);

  return (
    <div className="p-6 bg-[#0D0D15] rounded-[2.5rem] border border-white/5 shadow-2xl mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
            <MdGroups className="text-indigo-500" /> Team Directory
          </h2>
          <p className="text-gray-500 font-medium mt-1 italic">
            Connected with colleagues at your workplace.
          </p>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 bg-[#161926] rounded-2xl border border-white/5 w-full md:w-auto">
          <MdBusiness className="text-indigo-500 text-xl" />
          <span className="text-white font-black text-xs uppercase tracking-widest truncate">
            {company || 'Awaiting Affiliation'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-12 flex flex-col items-center justify-center bg-[#161926] rounded-[2rem] border border-white/5">
            <span className="loading loading-infinity loading-lg text-indigo-500"></span>
            <p className="text-gray-600 font-black text-[10px] uppercase tracking-[0.3em] mt-4">
              Syncing Team Data
            </p>
          </div>
        ) : members.length === 0 ? (
          <div className="col-span-full py-12 flex flex-col items-center justify-center bg-[#161926] rounded-[2rem] border border-white/5 text-center">
            <MdGroups size={40} className="text-gray-800 mb-2" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
              No active members found in your team
            </p>
          </div>
        ) : (
          members.map(item => {
            const emp = item.employee;
            return (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-[#161926] border border-white/5 p-4 rounded-3xl hover:border-indigo-500/30 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={emp?.profileImage || 'https://via.placeholder.com/48'}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-indigo-500/50 transition-colors"
                    alt={emp?.name}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#0D0D15] rounded-full p-1 border border-white/5">
                    <MdVerified className="text-indigo-500 text-xs" />
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h3 className="font-black text-white text-sm uppercase tracking-tight truncate">
                    {emp?.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold truncate tracking-widest">
                    {emp?.email}
                  </p>
                  {emp?.dateOfBirth && (
                    <div className="flex items-center gap-1 mt-1">
                      <MdCake className="text-indigo-500 text-[10px]" />
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">
                        {new Date(emp.dateOfBirth).toLocaleDateString(
                          undefined,
                          { month: 'long', day: 'numeric' }
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-10 p-6 bg-gradient-to-r from-indigo-900/10 to-transparent rounded-[2rem] border border-indigo-500/10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <MdCake className="text-indigo-400" />
            <h3 className="font-black text-white uppercase text-xs tracking-widest italic">
              Upcoming Birthdays
            </h3>
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            Notification engine initializing...{' '}
            <span className="text-indigo-500">Coming Soon</span>
          </p>
        </div>
        <div className="absolute top-0 right-0 opacity-5 -translate-y-1/2 translate-x-1/4">
          <MdCake size={120} />
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
