import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const EditAssetModal = ({ asset, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [name, setName] = useState(asset.name || '');
  const [type, setType] = useState(asset.type || 'Returnable');
  const [quantity, setQuantity] = useState(asset.quantity || 1);
  const [image, setImage] = useState(asset.image || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name) {
      Swal.fire('Error', 'Asset name is required', 'error');
      return;
    }
    setLoading(true);
    try {
      await axiosSecure.patch(`/assets/${asset._id}`, {
        name,
        type,
        quantity: parseInt(quantity),
        availableQuantity: parseInt(quantity),
        image,
      });
      Swal.fire('Success', 'Asset updated successfully', 'success');
      onClose(true);
    } catch (err) {
      console.error('Update failed:', err);
      Swal.fire('Error', 'Failed to update asset', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-secondary p-6 rounded shadow-lg w-96 relative">
        <h3 className="text-xl font-bold mb-4">Edit Asset</h3>

        <div className="mb-3">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Type</label>
          <select
            className="border p-2 w-full rounded"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={quantity}
            min={1}
            onChange={e => setQuantity(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="btn btn-error"
            onClick={() => onClose(false)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAssetModal;
