import { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Save token to localStorage (JWT)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      const userData = data.user;
      localStorage.setItem('user', JSON.stringify(userData));

      if (userData.role === 'hr') {
        navigate('/hr-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
      // redirect after login
    } catch (err) {
      setError('Server error');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-[#0E1420] border border-[#7C808A] shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          AssetVerse Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-[#1F2937] text-gray-400 border border-[#7C808A] rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full bg-[#1F2937] text-gray-400 border border-[#7C808A] rounded-xl pt-1"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary w-full border border-[#7C808A] rounded-xl ${
              loading ? 'loading' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-300">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-primary font-semibold underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
