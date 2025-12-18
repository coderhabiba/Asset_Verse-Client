import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import { RiUserSharedLine, RiLoader4Line } from 'react-icons/ri';

const EmployeeRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const { createUser, updateUserProfile, setUser, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleDateChange = e => setDateOfBirth(e.target.value);

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = form.email.value;
    const profileImage = form.photo.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: profileImage });

      const res = await axios.post(
        'https://asset-verse-server-sigma.vercel.app/register-employee',
        {
          name,
          email,
          date,
          password,
          profileImage,
          role: 'employee',
        }
      );

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser({
          ...result.user,
          displayName: name,
          photoURL: profileImage,
          role: 'employee',
          ...res.data.user,
        });
        toast.success('Employee Registered Successfully');
        navigate('/employee-dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    'w-full px-5 py-3.5 bg-[#0E0C17]/50 border border-white/5 text-white rounded-2xl outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600 text-sm font-medium';
  const labelStyle =
    'block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1';

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-[#0B0F1A] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="text-center mb-10">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl border border-white/10 mb-6"
          >
            <RiUserSharedLine className="text-3xl text-purple-400" />
          </motion.div>
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
            Join the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Team
            </span>
          </h2>
          <p className="text-gray-400 font-medium tracking-wide">
            Start managing company resources efficiently.
          </p>
        </div>

        <div className="bg-[#161B2B]/60 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Date of Birth</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={dateOfBirth}
                  onChange={handleDateChange}
                  className={`${inputStyle} ${!dateOfBirth && 'text-gray-600'}`}
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Secure Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="••••••••"
                  className={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={22} />
                  ) : (
                    <IoEyeOutline size={22} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className={labelStyle}>Profile Photo URL</label>
              <input
                type="url"
                name="photo"
                required
                placeholder="https://image-link.com/avatar.png"
                className={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl text-white font-black tracking-[0.2em] uppercase text-sm shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-70"
            >
              <div className="flex items-center justify-center gap-3">
                {loading ? (
                  <RiLoader4Line className="animate-spin text-2xl" />
                ) : (
                  'Create Account'
                )}
              </div>
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-purple-500 hover:text-purple-400 font-black transition-colors ml-1"
              >
                SIGN IN
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeRegistration;
