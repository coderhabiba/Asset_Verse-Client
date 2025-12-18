import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const HrRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const { createUser, updateUserProfile, setUser,setLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
 
  const handleDateChange = e => setDateOfBirth(e.target.value);

const handleRegister = async e => {
  e.preventDefault();
  setLoading(true);

  const form = e.target;
  const name = form.name.value;
  const companyName = form.companyName.value;
  const date = form.date.value;
  const email = form.email.value;
  const companyLogo = form.companyLogo.value;
  const password = form.password.value;

  if (!name || !companyName || !date || !email || !companyLogo || !password) {
    toast.error('All fields are required');
    setLoading(false);
    return;
  }

  try {
    // firebase user
    const result = await createUser(email, password);

    await updateUserProfile({
      displayName: name,
      photoURL: companyLogo,
    });

    // backend HR save
    const payload = {
      name,
      companyName,
      companyLogo,
      email,
      password,
      date: date, 
    };

    const res = await axiosSecure.post('/register-hr', payload);
    const backendUser = res.data.user;

    // save token for future requests
    if (res.data.token) localStorage.setItem('access-token', res.data.token);

    // context user set
    setUser({
      uid: result.user.uid,
      email,
      name,
      photo: companyLogo,
      role: backendUser.role || 'hr',
      companyName: backendUser.companyName,
      companyLogo: backendUser.companyLogo,
    });

    toast.success('HR Registered Successfully');
    navigate('/hr-dashboard');
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
  } 
  setLoading(false);
  
};



  return (
    <div className="flex items-center justify-center py-14">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="mx-auto text-purple-500 text-4xl mb-3">
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
            Create an HR account to manage assets and team members.
          </p>
        </div>

        <div className="bg-[#191925] p-8 md:p-10 rounded-xl shadow-2xl border border-[#2B233D]">
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date"
                  value={dateOfBirth}
                  onChange={handleDateChange}
                  className={`w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none appearance-none ${
                    dateOfBirth ? 'text-white' : 'text-gray-400'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="hr@company.com"
                  className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Company Logo URL
              </label>
              <input
                type="url"
                name="companyLogo"
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 border border-[#2B233D] bg-[#0E0C17] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="********"
                  className="w-full px-4 pt-3 pb-1 pr-12 bg-[#0E0C17] border border-[#2B233D] text-white rounded-lg focus:ring-purple-600 focus:border-purple-600 outline-none"
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
                Must be minimum 6 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition"
            >
              Register as HR Manager
            </button>
          </form>

          <p className="text-center text-xs mt-6 text-gray-500">
            By signing up, you agree to our{' '}
            <span className="text-purple-400">Terms</span> &{' '}
            <span className="text-purple-400">Privacy Policy</span>.
          </p>
        </div>

        <p className="text-gray-400 text-center text-sm mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-purple-400 hover:underline font-semibold cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default HrRegistration;
