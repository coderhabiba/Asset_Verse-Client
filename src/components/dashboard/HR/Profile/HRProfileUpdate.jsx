import { useContext, useState } from 'react';
import { AuthContext } from './../../../../context/AuthContext/AuthContext';
import toast from 'react-hot-toast';
import {
  FaUserCircle,
  FaEdit,
  FaSave,
  FaImage,
  FaSpinner,
} from 'react-icons/fa';
import { MdEmail, MdWork } from 'react-icons/md';

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

  const role = user?.role === 'hr' ? 'HR Manager' : 'Unknown';

  const handleSaveProfile = async e => {
    e.preventDefault();
    setIsSaving(true);
    const toastId = toast.loading('Updating profile...');

    try {
      if (displayName !== user?.displayName || photoURL !== user?.photoURL) {
        await updateUserProfile(displayName, photoURL);
      }
      setDisplayName(user?.displayName);
      setPhotoURL(user?.photoURL);
      setIsEditing(false);
      toast.success('Profile updated successfully!', { id: toastId });
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Failed to update profile. Please try again.', {
        id: toastId,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />
        <p className="ml-3">Loading profile data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-400">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-[90%] mx-auto py-10">
      {/* header */}
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-2">My Profile</h2>
        <p className="text-gray-400 text-lg">
          Manage your personal and HR details.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* profile display card */}
        <div className="lg:w-1/3 p-6 bg-[#2B233D] rounded-xl shadow-2xl border border-purple-800 h-fit">
          <div className="flex flex-col items-center">
            {/* img */}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || user.email}
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-600 shadow-lg mb-4"
              />
            ) : (
              <FaUserCircle className="w-32 h-32 text-purple-600 mb-4" />
            )}

            <h3 className="text-2xl font-bold text-white mb-1">
              {user?.displayName || ''}
            </h3>

            <div className="text-gray-400 space-y-2 mt-4 text-center w-full">
              <p className="flex items-center justify-center gap-2 text-md font-medium">
                <MdEmail className="text-purple-400" />
                <span>{user.email}</span>
              </p>
              <p className="flex items-center justify-center gap-2 text-md font-medium">
                <MdWork className="text-purple-400" />
                <span className="text-green-400 font-bold">{role}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn w-full btn-primary hover:bg-purple-700 text-white font-bold"
            >
              <FaEdit />
              {isEditing ? 'Close Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* profile update form */}
        <div className="lg:w-2/3 p-8 bg-[#191925] rounded-xl shadow-2xl border border-gray-700">
          <h3 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-3">
            {isEditing ? 'Update Your Information' : 'Profile Details'}
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                disabled={!isEditing}
                required
                className={`w-full p-3 rounded-lg bg-[#2B233D] border ${
                  isEditing
                    ? 'border-purple-600 text-white'
                    : 'border-gray-700 text-gray-400'
                } focus:ring-purple-500 focus:border-purple-500 transition duration-300`}
              />
            </div>

            {/* photo URL */}
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <FaImage /> Photo URL
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={e => setPhotoURL(e.target.value)}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg bg-[#2B233D] border ${
                  isEditing
                    ? 'border-purple-600 text-white'
                    : 'border-gray-700 text-gray-400'
                } focus:ring-purple-500 focus:border-purple-500 transition duration-300`}
              />
            </div>

            {/* email field (disabled) */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email (Cannot be changed)
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-700 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* save btn */}
            {isEditing && (
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn btn-success hover:bg-green-300 font-bold px-6 py-3 rounded-lg shadow-lg disabled:opacity-50 transition duration-300"
                >
                  {isSaving ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    <FaSave className="mr-2" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default HRProfileUpdate;
