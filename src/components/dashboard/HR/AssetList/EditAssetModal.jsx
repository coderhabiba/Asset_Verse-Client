import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {
  MdEdit,
  MdClose,
  MdInventory,
  MdCategory,
  MdNumbers,
  MdImage,
} from 'react-icons/md';

const EditAssetModal = ({ asset, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [name, setName] = useState(asset.name || '');
  const [type, setType] = useState(asset.type || 'Returnable');
  const [quantity, setQuantity] = useState(asset.quantity || 1);
  const [image, setImage] = useState(asset.image || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name) {
      Swal.fire({
        title: 'Error',
        text: 'Asset name is required',
        icon: 'error',
        background: '#161926',
        color: '#fff',
        confirmButtonColor: '#ef4444',
      });
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
      Swal.fire({
        title: 'Updated!',
        text: 'Asset updated successfully',
        icon: 'success',
        background: '#161926',
        color: '#fff',
        confirmButtonColor: '#4f46e5',
      });
      onClose(true);
    } catch (err) {
      console.error('Update failed:', err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update asset',
        icon: 'error',
        background: '#161926',
        color: '#fff',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
      <div className="bg-[#161926] border border-white/10 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-white/5 bg-gradient-to-r from-indigo-500/10 to-transparent flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-xl">
              <MdEdit className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">
                Edit Asset
              </h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Update item specifications
              </p>
            </div>
          </div>
          <button
            onClick={() => onClose(false)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <MdInventory className="text-indigo-500" /> Asset Name
            </label>
            <input
              type="text"
              className="w-full p-4 bg-[#0D0D15] rounded-2xl border border-white/5 text-white font-bold focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. MacBook Pro"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <MdCategory className="text-indigo-500" /> Type
              </label>
              <select
                className="w-full p-4 bg-[#0D0D15] rounded-2xl border border-white/5 text-white font-bold focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                value={type}
                onChange={e => setType(e.target.value)}
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-Returnable">Non-Returnable</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <MdNumbers className="text-indigo-500" /> Quantity
              </label>
              <input
                type="number"
                className="w-full p-4 bg-[#0D0D15] rounded-2xl border border-white/5 text-white font-bold focus:border-indigo-500 outline-none transition-all"
                value={quantity}
                min={1}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <MdImage className="text-indigo-500" /> Image URL
            </label>
            <input
              type="text"
              className="w-full p-4 bg-[#0D0D15] rounded-2xl border border-white/5 text-white font-bold focus:border-indigo-500 outline-none transition-all"
              placeholder="https://image-link.com"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
          </div>
        </div>

        <div className="p-8 bg-[#0D0D15]/50 flex gap-3">
          <button
            className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all"
            onClick={() => onClose(false)}
            disabled={loading}
          >
            Discard
          </button>
          <button
            className="flex-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all disabled:opacity-50 active:scale-95"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Sync Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAssetModal;
