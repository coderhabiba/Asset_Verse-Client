import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../../context/AuthContext/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginUserWithExpress } = useContext(AuthContext);
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

      // Role-based redirect
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
    <div className="flex items-center justify-center py-20">
      <div className="bg-secondary border border-purple-950 p-8 rounded-xl max-w-md w-full">
        <h2 className="text-3xl text-center text-primary font-bold mb-6">
          Login
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input bg-[#0E0C17] border-purple-950 rounded-2xl text-gray-300 w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input w-full bg-[#0E0C17] border-purple-950 rounded-2xl text-gray-300"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full rounded-2xl"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
