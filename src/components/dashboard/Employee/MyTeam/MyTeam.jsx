import { useEffect, useState, useContext } from 'react';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { AuthContext } from './../../../../context/AuthContext/AuthContext';


const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [company, setCompany] = useState('');
  const [hrEmail, setHrEmail] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  /*===============================
    find HR from assigned assets
  =================================*/
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

  /*=========================
    fetch team members
  ========================= */
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
    <div className="card bg-secondary text-gray-300 shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">My Team</h2>

      {/* company dropdown */}
      <select
        className="select select-bordered bg-secondary border-purple-950 w-full mb-4"
        value={company}
        disabled
      >
        <option>{company || 'No Company Found'}</option>
      </select>

      {/* team members */}
      {loading ? (
        <p className="text-center py-4">Loading team...</p>
      ) : members.length === 0 ? (
        <p className="text-center py-4">No team members found</p>
      ) : (
        <div className="space-y-3">
          {members.map(item => {
            const emp = item.employee;
            return (
              <div
                key={item._id}
                className="flex items-center gap-3 border border-purple-950 p-3 rounded-lg"
              >
                <img
                  src={emp?.profileImage || 'https://via.placeholder.com/48'}
                  className="w-12 h-12 rounded-full"
                  alt={emp?.name}
                />
                <div>
                  <h3 className="font-semibold">{emp?.name}</h3>
                  <p className="text-xs">{emp?.email}</p>
                  {emp?.dateOfBirth && (
                    <p className="text-xs text-gray-400">
                      Date of birth: {new Date(emp.dateOfBirth).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* upcoming birthdays */}
      <h3 className="mt-5 font-bold text-primary">Upcoming Birthdays</h3>

      <p className="text-sm text-gray-400">Feature coming soon 🎂</p>
    </div>
  );
};

export default MyTeam;
