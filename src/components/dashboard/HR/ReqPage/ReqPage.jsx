import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
} from 'react-icons/hi';

const ReqPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastFetchedEmail = useRef(null);
  // console.log(requests);
  
  const fetchRequests = useCallback(
    async (forceRefresh = false) => {
      if (!user?.email) return;

      if (!forceRefresh && lastFetchedEmail.current === user.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axiosSecure.get(`/requests/${user.email}`);
        setRequests(Array.isArray(res.data) ? res.data : []);
        lastFetchedEmail.current = user.email;
      } catch (err) {
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    },
    [user?.email, axiosSecure]
  );

  useEffect(() => {
    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email, fetchRequests]);

  const handleAction = async (id, action) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ${action} this request.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: action === 'approve' ? '#22c55e' : '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: `Yes, ${action}!`,
      background: '#161926',
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.put(`/requests/${action}/${id}`);

        if (res.data.modifiedCount > 0 || res.status === 200) {
          await Swal.fire({
            title: 'Success!',
            text: `Request ${action}d successfully.`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: '#161926',
          });

          fetchRequests(true);
        }
      } catch (err) {
        console.error('Action Error:', err);
        if (err.response?.data?.code === 'PACKAGE_LIMIT_EXCEEDED') {
          Swal.fire({
            icon: 'warning',
            title: 'Package Limit Exceeded',
            text: '❗ Upgrade required to add more members.',
            background: '#161926',
            color: '#fff',
          });
        } else {
          Swal.fire('Error', 'Failed to update status', 'error');
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#161926]/60 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl min-h-[500px]"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Employee Requests
        </h2>
        <p className="text-purple-400/80 text-sm font-medium mt-1">
          Review and manage asset requests from your team
        </p>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-[0.2em] font-black">
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Asset Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-24 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-purple-600"></span>
                    <p className="text-gray-500 font-medium animate-pulse tracking-widest uppercase text-xs">
                      Syncing Requests...
                    </p>
                  </div>
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-24 text-gray-500 italic bg-[#0f111a]/20 rounded-3xl border border-dashed border-white/5"
                >
                  No requests found matching your criteria.
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {requests.map(r => (
                  <motion.tr
                    layout
                    key={r._id}
                    className="bg-[#1c2030]/40 hover:bg-[#252a3d] transition-all duration-300 group shadow-sm hover:shadow-purple-500/5"
                  >
                    <td className="px-6 py-4 rounded-l-2xl border-l border-t border-b border-white/5">
                      <div className="flex flex-col">
                        <span className="font-bold text-white group-hover:text-purple-400 transition-colors uppercase text-sm">
                          {r?.requesterName || 'Unknown'}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {r.employeeEmail || 'No Email'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-t border-b border-white/5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-200">
                          {r.assetName}
                        </span>
                        <span className="text-[10px] text-purple-400 uppercase font-black tracking-tighter">
                          {r.assetType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-t border-b border-white/5">
                      <div
                        className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                          r.requestStatus === 'pending'
                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            : r.requestStatus === 'approved'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : r.requestStatus === 'rejected' ||
                              r.requestStatus === 'reject'
                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                            : 'bg-gray-500/10 text-gray-400 border-white/5'
                        }`}
                      >
                        {r.requestStatus === 'pending' && (
                          <HiOutlineClock
                            className="animate-spin"
                            style={{ animationDuration: '3s' }}
                          />
                        )}
                        {r.requestStatus}
                      </div>
                    </td>
                    <td className="px-6 py-4 rounded-r-2xl border-r border-t border-b border-white/5 text-right">
                      <div className="flex justify-end gap-3">
                        {r.requestStatus === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleAction(r._id, 'approve')}
                              className="p-2.5 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                            >
                              <HiOutlineCheckCircle size={22} />
                            </button>
                            <button
                              onClick={() => handleAction(r._id, 'reject')}
                              className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                            >
                              <HiOutlineXCircle size={22} />
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-600 text-[10px] uppercase font-black tracking-widest px-4 italic">
                            {r.requestStatus === 'approved'
                              ? 'Accepted'
                              : 'Rejected'}
                          </span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ReqPage;
