import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './../../../context/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { RiLoader4Line } from 'react-icons/ri';

const Login = () => {
  const navigate = useNavigate();
  const { loginUserWithExpress } = useContext(AuthContext) || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUserWithExpress(email, password);

      if (!data || !data.user || !data.token) {
        setError('Invalid login response from server');
        return;
      }

      const role = data.user.role;
      if (role === 'hr') navigate('/hr-dashboard');
      else if (role === 'employee') navigate('/employee-dashboard');
      else setError('Unknown role — contact admin');
    } catch (err) {
      console.error('Login Error:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Server error occurred. Check server logs.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0B0F1A] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#161B2B]/60 backdrop-blur-xl border border-white/10 p-10 rounded-[32px] shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
              Welcome{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Back!
              </span>
            </h2>
            <p className="text-gray-400 font-medium">
              Please enter your details to login.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl mb-6 text-sm text-center font-bold"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors text-xl" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#0E0C17]/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-gray-200 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600"
                required
              />
            </div>

            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors text-xl" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#0E0C17]/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-gray-200 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600"
                required
              />
            </div>

            <div className="flex justify-end px-1">
              <button
                type="button"
                className="text-xs font-bold text-purple-500 hover:text-purple-400 transition"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl text-white font-black tracking-widest uppercase text-sm shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <RiLoader4Line className="animate-spin text-2xl" />
                ) : (
                  <>
                    <span>Login Account</span>
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="text-center mt-8 text-gray-500 text-sm font-medium">
            Don't have an account?
            <Link
              to="/join-employee"
              className="text-purple-500 hover:text-purple-400 font-bold ml-1 transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
