import { Link } from 'react-router';
import logo from '../../assets/logo.png';
import { RiLoginBoxLine } from 'react-icons/ri';

const Navbar = ({ user }) => {
  const isHR = user?.role === 'hr';
  const links = (
    <>
      <Link
        className="px-4 py-2 bg-[#2B233D] border-[0.5px] border-[#4A2878] rounded-2xl transition duration-300"
        to="/"
      >
        Home
      </Link>

      <Link
        className="text-gray-300 transition duration-300 hover:text-purple-400"
        to="/join-employee"
      >
        Join as Employee
      </Link>

      <Link
        className="text-gray-300 transition duration-300 hover:text-purple-400"
        to="/join-hr"
      >
        Join as HR Manager
      </Link>

      <Link
        className="flex items-center px-6 py-3 bg-purple-700 text-white font-bold rounded-2xl shadow-lg hover:bg-purple-600 transition duration-300"
        to="/login"
      >
        <RiLoginBoxLine className="mr-2" size={20} />
        Login
      </Link>
    </>
  );

  return (
    <div className="bg-[#191925] text-white shadow-xl py-4 border-b border-[#2B233D]">
      <div className="navbar max-w-[90%] mx-auto">
        <div className="flex-1">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-500">
              <img src={logo} alt="" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-white tracking-wider">
                ASSETVERSE
              </p>
              <p className="text-xs text-gray-400 -mt-1">
                Asset Management System
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-none hidden md:flex items-center space-x-6">
          {!user && <>
            {links}
          </>}

          {user && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost rounded-btn flex items-center p-2 border border-purple-600 hover:bg-[#2B233D] transition duration-300"
              >
                <img
                  src={user.photoURL || 'https://via.placeholder.com/30'}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                  alt="profile"
                />
                <span className="text-sm font-semibold text-gray-200">
                  {user.name || user.email.split('@')[0]}
                </span>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-[#2B233D] text-gray-200 rounded-lg w-52 mt-4 space-y-1 z-10"
              >
                {isHR ? (
                  <>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/assets"
                      >
                        Asset List
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/add-asset"
                      >
                        Add Asset
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/requests"
                      >
                        All Requests
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/employees"
                      >
                        Employee List
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/logout"
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/my-assets"
                      >
                        My Assets
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/my-team"
                      >
                        My Team
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/request-asset"
                      >
                        Request Asset
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:bg-purple-700/50 rounded-md"
                        to="/logout"
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* mobile menu*/}
        <div className="flex-none md:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-square btn-ghost text-white">
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
              className="dropdown-content menu p-2 shadow bg-[#2B233D] rounded-box w-52 mt-2 text-gray-200 z-10"
            >
              {!user && (
                <>
                  {links}
                </>
              )}
              {user && isHR && (
                <>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/assets"
                    >
                      Asset List
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/add-asset"
                    >
                      Add Asset
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/requests"
                    >
                      All Requests
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/employees"
                    >
                      Employee List
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/logout"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
              {user && !isHR && (
                <>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/my-assets"
                    >
                      My Assets
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/my-team"
                    >
                      My Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/request-asset"
                    >
                      Request Asset
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:bg-purple-700/50 rounded-md"
                      to="/logout"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
