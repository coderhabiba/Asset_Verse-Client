import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import { RiShieldUserLine, RiLoader4Line } from 'react-icons/ri';

const HrRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const { createUser, updateUserProfile, setUser, setLoading, loading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleDateChange = e => setDateOfBirth(e.target.value);

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const companyName = form.companyName.value;
    const date = form.date.value;
    const email = form.email.value;
    const companyLogo = form.companyLogo.value;
    const password = form.password.value;

    if (!name || !companyName || !date || !email || !companyLogo || !password) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);

      await updateUserProfile({
        displayName: name,
        photoURL: companyLogo,
      });

      const payload = {
        name,
        companyName,
        companyLogo,
        email,
        password,
        date,
      };

      const res = await axios.post(
        'https://asset-verse-server-sigma.vercel.app/register-hr',
        payload
      );
      const backendUser = res.data.user;

      if (res.data.token) localStorage.setItem('token', res.data.token);

      setUser({
        uid: result.user.uid,
        email,
        name,
        photo: companyLogo,
        role: backendUser.role || 'hr',
        companyName: backendUser.companyName,
        companyLogo: backendUser.companyLogo,
      });

      toast.success('HR Registered Successfully');
      navigate('/hr-dashboard');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  const inputStyle =
    'w-full px-5 py-3.5 bg-[#0E0C17]/50 border border-white/5 text-white rounded-2xl outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600 text-sm font-medium';
  const labelStyle =
    'block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1';

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-[#0B0F1A] relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-3xl border border-purple-500/20 mb-6"
          >
            <RiShieldUserLine className="text-3xl text-purple-500" />
          </motion.div>
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
            HR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Manager
            </span>{' '}
            Portal
          </h2>
          <p className="text-gray-400 font-medium">
            Create your corporate account to manage assets.
          </p>
        </div>

        <div className="bg-[#161B2B]/60 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="TechVerse Ltd."
                  className={inputStyle}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Date of Birth</label>
                <input
                  type="date"
                  name="date"
                  value={dateOfBirth}
                  onChange={handleDateChange}
                  className={`${inputStyle} ${!dateOfBirth && 'text-gray-600'}`}
                />
              </div>
              <div>
                <label className={labelStyle}>Official Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="hr@company.com"
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Company Logo URL</label>
              <input
                type="url"
                name="companyLogo"
                placeholder="https://logo-link.com/img.png"
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Secure Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  className={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 ml-1 font-bold uppercase tracking-wider">
                🔒 Min 6 characters required
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl text-white font-black tracking-[0.2em] uppercase text-sm shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-70"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <RiLoader4Line className="animate-spin text-2xl" />
                ) : (
                  'Complete Registration'
                )}
              </div>
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Already managing a team?{' '}
              <span
                onClick={() => navigate('/login')}
                className="text-purple-500 hover:text-purple-400 font-black cursor-pointer transition-colors"
              >
                SIGN IN HERE
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HrRegistration;
