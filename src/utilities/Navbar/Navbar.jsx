import { NavLink } from 'react-router';
import { RiLoginBoxLine } from 'react-icons/ri';
import Logo from '../../components/Logo/Logo';

const Navbar = ({ user }) => {
  const isHR = user?.role === 'hr';

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-2xl transition duration-300 text-xs lg:text-[16px] ${
      isActive
        ? 'bg-[#342757] border border-purple-900 text-white'
        : 'text-gray-300 hover:text-purple-400'
    }`;

  const loginBtnClass = ({ isActive }) =>
    `flex items-center px-4 py-2 font-bold rounded-2xl shadow-lg text-xs lg:text-[16px] transition duration-300 ${
      isActive
        ? 'bg-primary text-white'
        : 'bg-purple-700 text-white hover:bg-purple-600'
    }`;

  const links = (
    <>
      <NavLink className={linkClass} to="/">
        Home
      </NavLink>

      <NavLink className={linkClass} to="/join-employee">
        Join as Employee
      </NavLink>

      <NavLink className={linkClass} to="/join-hr">
        Join as HR Manager
      </NavLink>

      <NavLink className={loginBtnClass} to="/login">
        <RiLoginBoxLine className="mr-2" size={20} />
        Login
      </NavLink>
    </>
  );

  return (
    <div className="bg-[#191925] text-white shadow-xl py-4 border-b border-[#2B233D]">
      <div className="max-w-[85%] mx-auto">

        <div className="navbar">

          {/* navbar start */}
          <div className="navbar-start">
            <Logo />
          </div>
           
          {/* navbar center */}
          <div className="navbar-center ml-12">
            <div className="flex-none hidden md:flex items-center space-x-2">
              {!user && <>{links}</>}

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
                          <NavLink className={linkClass} to="/assets">
                            Asset List
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className={linkClass} to="/add-asset">
                            Add Asset
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className={linkClass} to="/requests">
                            All Requests
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className={linkClass} to="/employees">
                            Employee List
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className={linkClass} to="/profile">
                            Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className={linkClass} to="/logout">
                            Logout
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink className={linkClass} to="/my-assets">
                            My Assets
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className={linkClass} to="/my-team">
                            My Team
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className={linkClass} to="/request-asset">
                            Request Asset
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className={linkClass} to="/profile">
                            Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className={linkClass} to="/logout">
                            Logout
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* navbar end */}
          <div className="navbar-end">
            {/* mobile menu */}
            <div className="flex-none md:hidden">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-square btn-ghost text-white"
                >
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
                  {!user && <>{links}</>}

                  {user && isHR && (
                    <>
                      <li>
                        <NavLink className={linkClass} to="/assets">
                          Asset List
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={linkClass} to="/add-asset">
                          Add Asset
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={linkClass} to="/requests">
                          All Requests
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={linkClass} to="/employees">
                          Employee List
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={linkClass} to="/profile">
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={linkClass} to="/logout">
                          Logout
                        </NavLink>
                      </li>
                    </>
                  )}

                  {user && !isHR && (
                    <>
                      <li>
                        <NavLink className={linkClass} to="/my-assets">
                          My Assets
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={linkClass} to="/my-team">
                          My Team
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={linkClass} to="/request-asset">
                          Request Asset
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={linkClass} to="/profile">
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={linkClass} to="/logout">
                          Logout
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Navbar;
