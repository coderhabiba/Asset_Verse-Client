import { useEffect, useState, useCallback, useRef } from 'react';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import EditAssetModal from './EditAssetModal';
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineSearch,
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingAsset, setEditingAsset] = useState(null);
  const lastQueryRef = useRef('');

  const fetchAssets = useCallback(
    async (isInitial = false) => {
      const currentQuery = `page=${page}&search=${search}`;
      if (!isInitial && lastQueryRef.current === currentQuery) return;

      try {
        setLoading(true);
        const res = await axiosSecure.get(
          `/assets?page=${page}&limit=${limit}&search=${search}`
        );
        setAssets(Array.isArray(res.data.assets) ? res.data.assets : []);
        setTotal(res.data.total || 0);
        lastQueryRef.current = currentQuery;
      } catch (err) {
        console.error('Error loading assets:', err);
      } finally {
        setLoading(false);
      }
    },
    [page, limit, search, axiosSecure]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAssets();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, page, fetchAssets]);

  const handleDelete = async id => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'This asset will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, delete it!',
      background: '#161926',
      color: '#fff',
    });

    if (confirmResult.isConfirmed) {
      try {
        await axiosSecure.delete(`/assets/${id}`);
        Swal.fire({
          title: 'Deleted!',
          icon: 'success',
          background: '#161926',
        });
        fetchAssets(true);
      } catch (err) {
        Swal.fire('Error', 'Failed to delete asset.', 'error');
      }
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#161926]/60 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl min-h-[600px]"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Company Assets
          </h2>
          <p className="text-purple-400 text-sm mt-1 uppercase tracking-widest font-bold">
            Total Inventory: {total}
          </p>
        </div>

        <div className="relative w-full md:w-80 group">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 text-xl" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#0f111a]/80 border border-white/10 text-gray-100 pl-12 pr-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-400 text-[10px] uppercase tracking-widest font-black px-6">
              <th className="px-6 py-2">Asset Details</th>
              <th className="px-6 py-2">Category</th>
              <th className="px-6 py-2">Stock Status</th>
              <th className="px-6 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-24 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-purple-600"></span>
                    <p className="text-gray-500 text-xs font-black uppercase animate-pulse tracking-widest">
                      Syncing Inventory...
                    </p>
                  </div>
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-24 text-center text-gray-500 italic bg-[#0f111a]/20 rounded-3xl border border-dashed border-white/10"
                >
                  No assets found for your search.
                </td>
              </tr>
            ) : (
              assets.map(asset => (
                <tr
                  key={asset._id}
                  className="bg-[#1c2030]/40 hover:bg-[#252a3d] transition-all duration-300 group shadow-sm"
                >
                  <td className="px-6 py-4 rounded-l-2xl border-l border-t border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <img
                          src={asset.image || 'https://via.placeholder.com/150'}
                          alt={asset.name}
                          className="h-full w-full object-cover rounded-xl border border-white/10 group-hover:border-purple-500/50 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white group-hover:text-purple-400 transition-colors uppercase text-sm">
                          {asset.name}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          ID: {asset._id.slice(-6)}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 border-t border-b border-white/5">
                    <span
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${
                        asset.type === 'Returnable'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {asset.type}
                    </span>
                  </td>

                  <td className="px-6 py-4 border-t border-b border-white/5">
                    <div className="flex flex-col">
                      <span
                        className={`text-lg font-black ${
                          asset.availableQuantity === 0
                            ? 'text-red-500'
                            : 'text-gray-200'
                        }`}
                      >
                        {asset.availableQuantity}
                      </span>
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">
                        Items Available
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 rounded-r-2xl border-r border-t border-b border-white/5 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setEditingAsset(asset)}
                        className="p-2.5 bg-purple-500/10 text-purple-400 hover:bg-purple-600 hover:text-white rounded-xl transition-all hover:scale-110 active:scale-95"
                      >
                        <HiOutlinePencilAlt size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(asset._id)}
                        className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all hover:scale-110 active:scale-95"
                      >
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex bg-[#0f111a]/80 p-1.5 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-black text-xs transition-all duration-300 ${
                  page === i + 1
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 scale-105'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {editingAsset && (
          <EditAssetModal
            asset={editingAsset}
            onClose={updated => {
              setEditingAsset(null);
              if (updated) fetchAssets(true);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AssetList;
