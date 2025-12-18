import { useState } from 'react';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  HiOutlinePlusCircle,
  HiOutlineCube,
  HiOutlineLink,
  HiOutlineHashtag,
} from 'react-icons/hi';

const AddAsset = () => {
  const [form, setForm] = useState({
    assetName: '',
    image: '',
    type: 'Returnable',
    quantity: '',
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.assetName || !form.quantity) {
      toast.error('Asset Name and Quantity are required');
      return;
    }

    if (Number(form.quantity) < 0) {
      toast.error('Quantity cannot be negative');
      return;
    }

    const payload = {
      name: form.assetName,
      image: form.image || 'https://i.ibb.co/vz44v4v/placeholder.png',
      type: form.type,
      quantity: Number(form.quantity),
      dateAdded: new Date(),
    };

    try {
      setLoading(true);
      await axiosSecure.post('/assets', payload);
      toast.success('Asset added successfully!');

      setForm({
        assetName: '',
        image: '',
        type: 'Returnable',
        quantity: '',
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to add asset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto mt-8 p-8 bg-[#161926]/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-600/20 rounded-2xl">
          <HiOutlinePlusCircle className="text-purple-500 text-3xl" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white">Add New Asset</h2>
          <p className="text-gray-400 text-sm">
            Create a new resource for your inventory
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* asset name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400 ml-1">
            Asset Name
          </label>
          <div className="relative group">
            <HiOutlineCube className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="text"
              name="assetName"
              placeholder="e.g. MacBook Pro M3"
              value={form.assetName}
              onChange={handleChange}
              className="w-full bg-[#0f111a]/80 border border-white/10 text-gray-100 pl-12 pr-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* asset type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 ml-1">
              Category
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full bg-[#0f111a]/80 border border-white/10 text-gray-100 px-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          {/* quantity */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 ml-1">
              Quantity
            </label>
            <div className="relative group">
              <HiOutlineHashtag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="number"
                name="quantity"
                placeholder="00"
                value={form.quantity}
                onChange={handleChange}
                className="w-full bg-[#0f111a]/80 border border-white/10 text-gray-100 pl-12 pr-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* img url */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400 ml-1">
            Image URL (Optional)
          </label>
          <div className="relative group">
            <HiOutlineLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.png"
              value={form.image}
              onChange={handleChange}
              className="w-full bg-[#0f111a]/80 border border-white/10 text-gray-100 pl-12 pr-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* btn */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 mt-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
            loading
              ? 'bg-purple-600/50 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] active:scale-[0.98]'
          }`}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </>
          ) : (
            'Confirm & Add Asset'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddAsset;
