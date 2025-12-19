import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import {
  FaUserEdit,
  FaCamera,
  FaBirthdayCake,
  FaEnvelope,
} from 'react-icons/fa';

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axiosSecure.get(`/user/${user.email}`);
      setName(res.data.name || '');
      setPhoto(res.data.photo || '');
      setDob(res.data.dateOfBirth || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchProfile();
    }
  }, [user]);

  const handleUpdate = async e => {
    e.preventDefault();

    try {
      await axiosSecure.put(`/user/${user.email}`, {
        name,
        photo,
        dateOfBirth: dob,
      });

      setUser(prev => ({
        ...prev,
        name,
        photo,
      }));

      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully',
        icon: 'success',
        background: '#161926',
        color: '#fff',
        confirmButtonColor: '#4f46e5',
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Profile update failed',
        icon: 'error',
        background: '#161926',
        color: '#fff',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <span className="loading loading-infinity loading-lg text-indigo-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-[#161926] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 w-full absolute top-0 left-0" />

        <div className="relative pt-12 px-8 pb-10">
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-[#0D0D15] shadow-2xl bg-[#0D0D15]">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700">
                    <FaUserEdit size={50} />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-xl text-white shadow-lg">
                <FaCamera size={14} />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-black text-white uppercase italic tracking-tighter">
              User <span className="text-indigo-500">Profile</span>
            </h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
              Identity & Credentials
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <FaUserEdit className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-4 pl-12 bg-[#0D0D15] rounded-2xl border border-white/5 text-white font-bold focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Email (Read Only)
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full p-4 pl-12 bg-[#0D0D15]/50 rounded-2xl border border-white/5 text-gray-600 font-bold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Profile Photo URL
                </label>
                <div className="relative">
                  <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="text"
                    value={photo}
                    onChange={e => setPhoto(e.target.value)}
                    className="w-full p-4 pl-12 bg-[#0D0D15] rounded-2xl border border-white/5 text-white font-bold focus:border-indigo-500 outline-none transition-all"
                    placeholder="https://image-link.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full p-4 pl-12 bg-[#0D0D15] rounded-2xl border border-white/5 text-white font-bold focus:border-indigo-500 outline-none transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]">
              Synchronize Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
