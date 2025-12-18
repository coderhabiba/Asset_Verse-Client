import { FaUserFriends } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const EmployeeRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');

  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleDateChange = e => {
    setDateOfBirth(e.target.value);
  };

  const handleRegister = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    try {
      // firebase create
      const result = await createUser(email, password);
      const firebaseUser = result.user;

      // update firebase profile
      await updateUserProfile({
        displayName: name,
        photoURL,
      });

      // 
      const res = await axiosSecure.post('/register-employee', {
        name,
        email,
        date,
        password,
        photoURL,
        role: 'employee',
      });

      if (res.data.insertedId) {
        // 
        setUser({
          ...firebaseUser,
          displayName: name,
          photoURL,
          role: 'employee',
        });
        navigate('/employee-dashboard');
        toast.success('Employee Registered Successfully');
        toast("No company affiliation");
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center py-14">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <FaUserFriends className="mx-auto text-purple-600 text-4xl mb-3" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Create an employee account
          </h2>
          <p className="text-gray-400 text-sm">
            Join the AssetVerse platform to manage company resources
            efficiently.
          </p>
        </div>

        <div className="bg-[#191925] p-8 md:p-10 rounded-xl shadow-2xl border border-[#2B233D]">
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="date"
                  value={dateOfBirth}
                  onChange={handleDateChange}
                  className={`w-full pl-4 pr-2 py-2 border border-[#2B233D] bg-[#0E0C17] rounded-lg focus:ring-purple-600 focus:border-purple-600 appearance-none outline-none transition duration-300 ${
                    dateOfBirth ? 'text-white' : 'text-gray-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="********"
                  className="w-full px-4 py-2 pr-12 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-400"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with uppercase, lowercase and
                number
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Photo URL
              </label>
              <input
                type="url"
                name="photo"
                placeholder="https://example.com/your-photo.jpg"
                className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>

        <p className="text-gray-400 text-center text-sm mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-purple-400 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
