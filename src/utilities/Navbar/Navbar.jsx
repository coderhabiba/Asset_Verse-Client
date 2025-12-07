import { Link } from 'react-router';

const Navbar = ({ user }) => {
  const isHR = user?.role === 'hr';

  return (
    <div className="navbar bg-blue-600 text-white shadow-md px-4">
      {/* Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:text-gray-200"
        >
          AssetVerse
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="flex-none hidden md:flex">
        {!user && (
          <>
            <Link className="btn btn-ghost text-white mx-2" to="/">
              Home
            </Link>
            <Link className="btn btn-ghost text-white mx-2" to="/join-employee">
              Join as Employee
            </Link>
            <Link className="btn btn-ghost text-white mx-2" to="/join-hr">
              Join as HR Manager
            </Link>
          </>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost rounded-btn flex items-center"
            >
              <img
                src={user.photoURL || 'https://via.placeholder.com/30'}
                className="w-8 h-8 rounded-full mr-2"
                alt="profile"
              />
              {user.name || user.email}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-white text-gray-800 rounded w-52 mt-2"
            >
              {user.role === 'hr' ? (
                <>
                  <li>
                    <Link to="/assets">Asset List</Link>
                  </li>
                  <li>
                    <Link to="/add-asset">Add Asset</Link>
                  </li>
                  <li>
                    <Link to="/requests">All Requests</Link>
                  </li>
                  <li>
                    <Link to="/employees">Employee List</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/my-assets">My Assets</Link>
                  </li>
                  <li>
                    <Link to="/my-team">My Team</Link>
                  </li>
                  <li>
                    <Link to="/request-asset">Request Asset</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="flex-none md:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-white rounded w-52 mt-2 text-gray-800"
          >
            {!user && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/join-employee">Join as Employee</Link>
                </li>
                <li>
                  <Link to="/join-hr">Join as HR Manager</Link>
                </li>
              </>
            )}
            {user && user.role === 'hr' && (
              <>
                <li>
                  <Link to="/assets">Asset List</Link>
                </li>
                <li>
                  <Link to="/add-asset">Add Asset</Link>
                </li>
                <li>
                  <Link to="/requests">All Requests</Link>
                </li>
                <li>
                  <Link to="/employees">Employee List</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )}
            {user && user.role !== 'hr' && (
              <>
                <li>
                  <Link to="/my-assets">My Assets</Link>
                </li>
                <li>
                  <Link to="/my-team">My Team</Link>
                </li>
                <li>
                  <Link to="/request-asset">Request Asset</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;