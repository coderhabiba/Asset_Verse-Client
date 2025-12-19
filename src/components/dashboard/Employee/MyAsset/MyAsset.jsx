import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import {
  MdAssignmentReturn,
  MdInventory,
  MdCalendarToday,
  MdBusiness,
} from 'react-icons/md';

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAssets = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/assigned-assets/${user.email}`);
      setAssets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load assets', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAssets();
  }, [user]);

  const handleReturn = async id => {
    const confirm = await Swal.fire({
      title: 'Return asset?',
      text: 'Are you sure you want to return this asset?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#1f2937',
      confirmButtonText: 'Yes, return it',
      background: '#161926',
      color: '#fff',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.put(`/assigned-assets/return/${id}`);
      Swal.fire({
        title: 'Returned!',
        text: 'Asset returned successfully',
        icon: 'success',
        background: '#161926',
        color: '#fff',
      });
      fetchMyAssets();
    } catch (err) {
      console.error('Return failed', err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to return asset',
        icon: 'error',
        background: '#161926',
        color: '#fff',
      });
    }
  };

  return (
    <div className="p-6 bg-[#0D0D15] rounded-[2.5rem] border border-white/5 shadow-2xl mt-6">
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase italic flex items-center gap-3">
            <MdInventory className="text-indigo-500" /> My Assets
          </h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Manage and track your assigned company resources.
          </p>
        </div>
        <div className="px-4 py-2 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
          <span className="text-indigo-400 text-xs font-black uppercase tracking-widest">
            Total: {assets.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-500 border-none uppercase text-[10px] tracking-[0.2em] font-black">
              <th className="bg-transparent border-none">Item</th>
              <th className="bg-transparent border-none">Details</th>
              <th className="bg-transparent border-none">Company</th>
              <th className="bg-transparent border-none">Assigned</th>
              <th className="bg-transparent border-none text-center">Status</th>
              <th className="bg-transparent border-none text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-20 bg-transparent border-none"
                >
                  <span className="loading loading-spinner loading-lg text-indigo-500"></span>
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-20 bg-[#161926] rounded-3xl border border-white/5"
                >
                  <div className="flex flex-col items-center gap-2">
                    <MdInventory size={40} className="text-gray-700" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                      No Assets Assigned to You
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              assets.map(asset => (
                <tr key={asset._id} className="group shadow-sm">
                  <td className="bg-[#161926] border-y border-l border-white/5 rounded-l-2xl py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 p-1 bg-[#0D0D15]">
                        <img
                          src={
                            asset.assetImage || 'https://via.placeholder.com/48'
                          }
                          className="w-full h-full object-cover rounded-lg"
                          alt={asset.name}
                        />
                      </div>
                      <div>
                        <div className="font-black text-white text-sm uppercase tracking-tight">
                          {asset.name}
                        </div>
                        <div className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mt-0.5">
                          {asset.assetType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="bg-[#161926] border-y border-white/5 py-4">
                    <span className="text-gray-400 text-xs font-bold">
                      Ref: {asset._id.slice(-6).toUpperCase()}
                    </span>
                  </td>
                  <td className="bg-[#161926] border-y border-white/5 py-4">
                    <div className="flex items-center gap-2 text-gray-300 text-xs font-bold">
                      <MdBusiness className="text-indigo-500" />{' '}
                      {asset.companyName}
                    </div>
                  </td>
                  <td className="bg-[#161926] border-y border-white/5 py-4">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                      <MdCalendarToday className="text-gray-600" />
                      {asset.assignmentDate
                        ? new Date(asset.assignmentDate).toLocaleDateString()
                        : '—'}
                    </div>
                  </td>
                  <td className="bg-[#161926] border-y border-white/5 py-4 text-center">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                      {asset.status}
                    </span>
                  </td>
                  <td className="bg-[#161926] border-y border-r border-white/5 rounded-r-2xl py-4 text-right">
                    {asset.assetType === 'Returnable' &&
                    asset.status === 'assigned' ? (
                      <button
                        onClick={() => handleReturn(asset._id)}
                        className="btn btn-sm bg-indigo-600 hover:bg-indigo-500 border-none text-white font-black text-[10px] uppercase tracking-widest px-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 flex items-center gap-2 ml-auto"
                      >
                        <MdAssignmentReturn size={14} /> Return
                      </button>
                    ) : (
                      <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                        No Action
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
