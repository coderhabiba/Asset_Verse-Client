import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { AuthContext } from './../../../../context/AuthContext/AuthContext';
import {
  MdOutlineDoubleArrow,
  MdOutlineDescription,
  MdHistory,
  MdPendingActions,
} from 'react-icons/md';

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axiosSecure.get('/assets/available');
      setAssets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(
        'Failed to fetch assets:',
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async () => {
    if (!selectedAsset) {
      Swal.fire({
        title: 'Selection Required',
        text: 'Please select an asset to request',
        icon: 'warning',
        background: '#161926',
        color: '#fff',
        confirmButtonColor: '#4f46e5',
      });
      return;
    }
    try {
      const selected = assets.find(a => a._id === selectedAsset);
      if (!selected) {
        Swal.fire('Error', 'Selected asset not found', 'error');
        return;
      }

      const payload = {
        employeeEmail: user.email,
        hrEmail: selected.hrEmail,
        assetId: selected._id,
        assetName: selected.name || '',
        assetType: selected.type || '',
        note,
      };

      await axiosSecure.post('/requests', payload);
      Swal.fire({
        title: 'Submitted!',
        text: 'Your request has been sent to HR',
        icon: 'success',
        background: '#161926',
        color: '#fff',
        confirmButtonColor: '#10b981',
      });
      setSelectedAsset('');
      setNote('');
      fetchRequests();
    } catch (err) {
      console.error(
        'Failed to send request:',
        err.response?.data || err.message
      );
      Swal.fire('Error', 'Failed to send request', 'error');
    }
  };

  const fetchRequests = async () => {
    if (!user?.email) return;
    try {
      const res = await axiosSecure.get(`/requests/employee/${user.email}`);
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(
        'Failed to fetch requests:',
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchAssets();
    fetchRequests();
  }, [user]);

  return (
    <div className="space-y-8 mt-6">
      <div className="bg-[#161926] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-500/10 rounded-2xl">
            <MdPendingActions className="text-indigo-500 text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              New Request
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Select an item from inventory
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-5 space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
              Choose Asset
            </label>
            <select
              className="w-full p-4 bg-[#0D0D15] rounded-2xl border border-white/5 text-gray-300 font-bold focus:border-indigo-500 outline-none transition-all cursor-pointer appearance-none"
              value={selectedAsset}
              onChange={e => setSelectedAsset(e.target.value)}
            >
              <option value="">Select an Available Asset</option>
              {assets.map(asset => (
                <option
                  key={asset._id}
                  value={asset._id}
                  className="bg-[#161926]"
                >
                  {asset.name} — {asset.availableQuantity} Left
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-5 space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
              Additional Note
            </label>
            <div className="relative">
              <MdOutlineDescription className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                className="w-full p-4 pl-12 bg-[#0D0D15] rounded-2xl border border-white/5 text-gray-300 font-bold focus:border-indigo-500 outline-none transition-all placeholder:text-gray-700"
                placeholder="Why do you need this?"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <button
              onClick={handleRequest}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Request <MdOutlineDoubleArrow className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D15] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-500/10 rounded-2xl">
            <MdHistory className="text-emerald-500 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Request Log
            </h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
              History of your applications
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-600 border-none uppercase text-[10px] tracking-widest font-black">
                <th className="bg-transparent border-none">Asset Info</th>
                <th className="bg-transparent border-none">Request Date</th>
                <th className="bg-transparent border-none">Note</th>
                <th className="bg-transparent border-none text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-10">
                    <span className="loading loading-spinner text-indigo-500"></span>
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-16 bg-[#161926] rounded-3xl border border-white/5"
                  >
                    <p className="text-gray-500 font-black uppercase tracking-widest text-xs opacity-50">
                      No Data Available
                    </p>
                  </td>
                </tr>
              ) : (
                requests.map(r => (
                  <tr key={r._id} className="group">
                    <td className="bg-[#161926] border-y border-l border-white/5 rounded-l-2xl py-5">
                      <div className="flex flex-col">
                        <span className="text-white font-black text-sm uppercase tracking-tight">
                          {r.assetName}
                        </span>
                        <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">
                          {r.assetType}
                        </span>
                      </div>
                    </td>
                    <td className="bg-[#161926] border-y border-white/5 py-5 text-gray-400 text-xs font-bold">
                      {r.requestDate
                        ? new Date(r.requestDate).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="bg-[#161926] border-y border-white/5 py-5 text-gray-500 text-xs italic font-medium max-w-[200px] truncate">
                      {r.note || 'No note attached'}
                    </td>
                    <td className="bg-[#161926] border-y border-r border-white/5 rounded-r-2xl py-5 text-right px-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          r.requestStatus === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                            : r.requestStatus === 'rejected'
                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        }`}
                      >
                        {r.requestStatus || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestAsset;
