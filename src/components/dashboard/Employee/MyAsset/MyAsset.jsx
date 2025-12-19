import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';


const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // get assigned assets
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

  // return asset
  const handleReturn = async id => {
    const confirm = await Swal.fire({
      title: 'Return asset?',
      text: 'Are you sure you want to return this asset?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, return',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.put(`/assigned-assets/return/${id}`);
      Swal.fire('Returned!', 'Asset returned successfully', 'success');
      fetchMyAssets();
    } catch (err) {
      console.error('Return failed', err);
      Swal.fire('Error', 'Failed to return asset', 'error');
    }
  };

  return (
    <div className="card bg-secondary text-gray-300 shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">My Assets</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className='text-gray-300'>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Company</th>
              <th>Assigned Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Assets Assigned
                </td>
              </tr>
            ) : (
              assets.map(asset => (
                <tr key={asset._id}>
                  <td>
                    <img
                      src={asset.assetImage || 'https://via.placeholder.com/48'}
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td>{asset.name}</td>
                  <td>{asset.assetType}</td>
                  <td>{asset.companyName}</td>
                  <td>
                    {asset.assignmentDate
                      ? new Date(asset.assignmentDate).toLocaleDateString()
                      : '—'}
                  </td>
                  <td className="font-bold text-green-500">{asset.status}</td>
                  <td>
                    {asset.assetType === 'Returnable' &&
                      asset.status === 'assigned' && (
                        <button
                          onClick={() => handleReturn(asset._id)}
                          className="btn btn-sm btn-warning"
                        >
                          Return
                        </button>
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
