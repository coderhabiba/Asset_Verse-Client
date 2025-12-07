import { FaUserFriends, FaGoogle } from 'react-icons/fa';
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoCalendarOutline,
} from 'react-icons/io5';
import { useState } from 'react';
import { Link } from 'react-router';

const EmployeeRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center py-14">
      <div className="">
        {/* Header Section */}
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
        <div className="w-full max-w-3xl bg-[#191925] p-8 md:p-10 rounded-xl shadow-2xl border border-[#2B233D]">
          {/* Form Body */}
          <form className="space-y-4">
            {/* Full Name & Date of Birth (Two columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-gray-400 rounded-lg focus:ring-purple-600 focus:border-purple-600 appearance-none outline-none transition duration-300"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-500">
                    <IoCalendarOutline />
                  </span>
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
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

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Photo URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
            >
              Register
            </button>
          </form>

          {/* Divider / Social Login */}
          <div className="flex items-center my-6">
            <div className="grow border-t border-gray-700"></div>
            <span className="mx-4 text-gray-500 text-sm">Or continue with</span>
            <div className="grow border-t border-gray-700"></div>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-3 bg-[#2B233D] text-gray-300 font-semibold rounded-lg shadow-md hover:bg-[#3C3252] transition duration-300"
          >
            <FaGoogle className="mr-3 text-lg" />
            Sign in with Google
          </button>

          {/* Footer Links */}
          <div className="text-center text-xs mt-6 bg-[#2B233D]">
            <p className="text-gray-500 mb-2">
              By signing up you agree to our{' '}
              <a href="#" className="text-purple-400 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-purple-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
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
