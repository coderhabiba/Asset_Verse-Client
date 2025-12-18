import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { AuthContext } from './../../../../context/AuthContext/AuthContext';


const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(true);

  /* =========================
     load profile
     ========================= */
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

  /* =========================
    update profile
  ========================= */
  const handleUpdate = async e => {
    e.preventDefault();

    try {
      await axiosSecure.put(`/user/${user.email}`, {
        name,
        photo,
        dateOfBirth: dob,
      });

      // update auth context user
      setUser(prev => ({
        ...prev,
        name,
        photo,
      }));

      Swal.fire('Updated!', 'Profile updated successfully', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Profile update failed', 'error');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">Loading profile...</div>
    );
  }

  return (
    <div className="card bg-secondary text-gray-300 shadow-md p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">My Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* name */}
        <div>
          <label className="label text-sm">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input w-full bg-transparent border border-purple-950"
            required
          />
        </div>

        {/* email */}
        <div>
          <label className="label text-sm">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input w-full bg-gray-700 cursor-not-allowed"
          />
        </div>

        {/* profile photo */}
        <div>
          <label className="label text-sm">Profile Image URL</label>
          <input
            type="text"
            value={photo}
            onChange={e => setPhoto(e.target.value)}
            placeholder="https://image-url.com"
            className="input w-full bg-transparent border border-purple-950"
          />
        </div>

        {/* date */}
        <div>
          <label className="label text-sm">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="input w-full bg-transparent border border-purple-950"
          />
        </div>

        {/* preview */}
        {photo && (
          <img
            src={photo}
            alt="profile"
            className="w-20 h-20 rounded-full border mx-auto"
          />
        )}

        <button className="btn btn-primary w-full">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
