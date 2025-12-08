
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoCalendarOutline,
} from 'react-icons/io5';
import { useState } from 'react';
import { Link } from 'react-router';

const HrRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleDateChange = e => {
    setDateOfBirth(e.target.value);
  };

  const packages = [
    { name: 'Basic', price: 'Free (5 Employees)' },
    { name: 'Standard', price: '$99/month (50 Employees)' },
    { name: 'Premium', price: '$299/month (Unlimited)' },
  ];

  return (
    <div className="flex items-center justify-center py-14">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="mx-auto text-purple-600 text-4xl mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 mx-auto"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 20.01c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Register as HR Manager
          </h2>
          <p className="text-gray-400 text-sm">
            Create an HR account to manage assets and team members with our
            comprehensive platform.
          </p>
        </div>

        <div className="bg-[#191925] p-8 md:p-10 rounded-xl shadow-2xl border border-[#2B233D]">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={handleDateChange}
                    className={`w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] rounded-lg focus:ring-purple-600 focus:border-purple-600 appearance-none outline-none transition duration-300 pr-10
                      ${dateOfBirth ? 'text-white' : 'text-gray-400'}
                    `}
                  />
                  {/* <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                    <IoCalendarOutline size={20} />
                  </span> */}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="hr@yourcompany.com"
                  className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Company Logo URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Photo URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
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
                Select a Package
              </label>
              <div className="relative">
                <select
                  value={selectedPackage}
                  onChange={e => setSelectedPackage(e.target.value)}
                  className={`w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none transition duration-300 appearance-none pr-10
                      ${selectedPackage ? 'text-white' : 'text-gray-400'}
                  `}
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#191925] text-gray-400"
                  >
                    Select a package
                  </option>
                  {packages.map(pkg => (
                    <option
                      key={pkg.name}
                      value={pkg.name}
                      className="bg-[#191925] text-white"
                    >
                      {pkg.name} - {pkg.price}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
            >
              Register as HR Manager
            </button>
          </form>

          <div className="text-center text-xs mt-6">
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

export default HrRegistration;
