import { useNavigate } from 'react-router-dom';

const HRDashboard = () => {
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
          AssetVerse - HR Dashboard
        </h1>
        <button onClick={logout} className="btn btn-error btn-sm">
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Assets</h2>
          <p>Total Assets: 12</p>
          <button className="btn btn-primary btn-sm mt-2">View Assets</button>
        </div>

        <div className="card bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Employee Requests</h2>
          <p>Pending Requests: 5</p>
          <button className="btn btn-primary btn-sm mt-2">View Requests</button>
        </div>

        <div className="card bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Employees</h2>
          <p>Current Employees: 3 / 5</p>
          <button className="btn btn-primary btn-sm mt-2">
            View Employees
          </button>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
