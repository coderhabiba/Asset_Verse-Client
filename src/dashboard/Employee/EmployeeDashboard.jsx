import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">
          AssetVerse - Employee Dashboard
        </h1>
        <button onClick={logout} className="btn btn-error btn-sm">
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">My Assets</h2>
          <p>You have 3 assigned assets</p>
          <button className="btn btn-primary btn-sm mt-2">
            View My Assets
          </button>
        </div>

        <div className="card bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Request Asset</h2>
          <p>Request new assets from your company</p>
          <button className="btn btn-primary btn-sm mt-2">Request Asset</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
