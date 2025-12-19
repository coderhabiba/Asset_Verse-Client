import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './../../../../context/AuthContext/AuthContext';
import toast from 'react-hot-toast';
import {
  FaUserCircle,
  FaEdit,
  FaSave,
  FaImage,
  FaSpinner,
  FaCamera,
} from 'react-icons/fa';
import { MdEmail, MdWork, MdVerifiedUser } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const HRProfileUpdate = () => {
  const {
    user,
    updateUserProfile,
    loading: authLoading,
  } = useContext(AuthContext) ?? {};

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const role = user?.role === 'hr' ? 'HR Manager' : 'Admin';

  const handleSaveProfile = async e => {
    e.preventDefault();
    setIsSaving(true);
    const toastId = toast.loading('Synchronizing profile...');

    try {
      await updateUserProfile(displayName, photoURL);
      setIsEditing(false);
      toast.success('Profile updated successfully!', { id: toastId });
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Update failed. Please check your connection.', {
        id: toastId,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <span className="loading loading-infinity loading-lg text-indigo-500"></span>
        <p className="mt-4 text-gray-500 font-black uppercase tracking-[0.3em] text-xs">
          Loading Security Data
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
          Identity <span className="text-indigo-500 italic">Settings</span>
        </h2>
        <p className="text-gray-500 font-medium mt-1">
          Update your administrative credentials and profile appearance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#161926] rounded-[2.5rem] border border-white/5 p-8 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-600/20 to-transparent" />

            <div className="relative z-10">
              <div className="relative inline-block group">
                {user?.photoURL || photoURL ? (
                  <img
                    src={photoURL || user?.photoURL}
                    className="w-40 h-40 rounded-[2.5rem] object-cover border-4 border-[#0D0D15] shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-[2.5rem] bg-[#0D0D15] flex items-center justify-center border-4 border-indigo-500/20">
                    <FaUserCircle className="w-24 h-24 text-gray-700" />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute inset-0 bg-indigo-600/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <FaCamera className="text-white text-2xl" />
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {user?.displayName || 'Administrator'}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-500/20">
                    {role}
                  </span>
                  <MdVerifiedUser className="text-emerald-500" />
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 p-4 bg-[#0D0D15] rounded-2xl border border-white/5">
                  <MdEmail className="text-indigo-500 text-xl" />
                  <span className="text-sm text-gray-400 font-bold truncate">
                    {user?.email}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`mt-8 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  isEditing
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white'
                    : 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700'
                }`}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#161926] rounded-[2.5rem] border border-white/5 p-10 shadow-2xl relative overflow-hidden h-full"
          >
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
              Information <span className="text-indigo-500">Details</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                      readOnly={!isEditing}
                      className={`w-full p-4 bg-[#0D0D15] rounded-2xl border transition-all duration-300 outline-none font-bold ${
                        isEditing
                          ? 'border-indigo-500 ring-4 ring-indigo-500/10 text-white'
                          : 'border-white/5 text-gray-500'
                      }`}
                    />
                    {!isEditing && (
                      <MdVerifiedUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700" />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                    Assigned Role
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={role}
                      disabled
                      className="w-full p-4 bg-[#0D0D15] rounded-2xl border border-white/5 text-gray-600 font-bold cursor-not-allowed uppercase text-xs"
                    />
                    <MdWork className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* photo URL */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Avatar Resource URL
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                    <FaImage />
                  </div>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={e => setPhotoURL(e.target.value)}
                    readOnly={!isEditing}
                    placeholder="https://example.com/photo.jpg"
                    className={`w-full p-4 pl-12 bg-[#0D0D15] rounded-2xl border transition-all duration-300 outline-none font-bold ${
                      isEditing
                        ? 'border-indigo-500 ring-4 ring-indigo-500/10 text-white'
                        : 'border-white/5 text-gray-500'
                    }`}
                  />
                </div>
                {isEditing && (
                  <p className="text-[10px] text-indigo-400 font-bold italic ml-1">
                    Provide a valid image URL to update your avatar.
                  </p>
                )}
              </div>

              {/* email */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Access Email (Locked)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full p-4 bg-[#0D0D15]/50 rounded-2xl border border-white/5 text-gray-700 font-bold italic"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-[8px] font-black uppercase text-gray-700">
                      Encrypted
                    </span>
                  </div>
                </div>
              </div>

              {/* save btn */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="pt-6"
                  >
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center justify-center gap-3 px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-900/20 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <FaSpinner className="animate-spin text-lg" />
                      ) : (
                        <FaSave className="text-lg" />
                      )}
                      {isSaving ? 'Syncing...' : 'Apply Changes'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HRProfileUpdate;
