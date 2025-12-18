import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { AuthContext } from './../../../../context/AuthContext/AuthContext';

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);

  // =====================
  // all available assets
  // =====================
  const fetchAssets = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axiosSecure.get('/assets/available');
      console.log('Assets fetched:', res.data);
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

  // =====================
  // send new request
  // =====================
  const handleRequest = async () => {
    if (!selectedAsset) {
      Swal.fire('Error', 'Select an asset to request', 'error');
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

      console.log('Sending request payload:', payload);

      await axiosSecure.post('/requests', payload);
      Swal.fire('Success', 'Request sent!', 'success');
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

  // ========================
  // employee's own requests
  // ========================
  const fetchRequests = async () => {
    if (!user?.email) return;
    try {
      const res = await axiosSecure.get(`/requests/employee/${user.email}`);
      console.log('Employee requests:', res.data);
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
    <div className="card bg-secondary text-gray-300 shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Request Asset</h2>

      {/* request form */}
      <div className="mb-6">
        <select
          className="select select-bordered bg-secondary border-purple-950 w-full mb-2"
          value={selectedAsset}
          onChange={e => setSelectedAsset(e.target.value)}
        >
          <option value="">Select Asset</option>
          {assets.map(asset => (
            <option key={asset._id} value={asset._id}>
              {asset.name} ({asset.type}) - Available: {asset.availableQuantity}
            </option>
          ))}
        </select>

        <textarea
          className="textarea textarea-bordered border-purple-950 bg-transparent w-full mb-2"
          placeholder="Add a note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        ></textarea>

        <button onClick={handleRequest} className="btn btn-primary w-full">
          Send Request
        </button>
      </div>

      {/* employee's requests table */}
      <div className="overflow-x-auto">
        <table className="table w-full table-auto">
          <thead>
            <tr className="bg-gray-500">
              <th>Asset</th>
              <th>Type</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map(r => (
                <tr key={r._id} className="hover:bg-gray-600">
                  <td>{r.assetName || 'Unknown'}</td>
                  <td>{r.assetType || '-'}</td>
                  <td>
                    {r.requestDate
                      ? new Date(r.requestDate).toLocaleDateString()
                      : '-'}
                  </td>
                  <td
                    className={`font-bold ${
                      r.requestStatus === 'approved'
                        ? 'text-green-500'
                        : r.requestStatus === 'rejected'
                        ? 'text-red-500'
                        : 'text-yellow-400'
                    }`}
                  >
                    {r.requestStatus || 'pending'}
                  </td>
                  <td>{r.note || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAsset;
