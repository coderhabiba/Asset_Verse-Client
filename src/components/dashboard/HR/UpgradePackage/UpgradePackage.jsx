import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MdAttachMoney,
  MdCheckCircle,
  MdCancel,
} from 'react-icons/md'; 
import CheckoutForm from './CheckoutForm';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const UpgradePackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [allPackage, setAllPackage] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate(); 
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const txn = queryParams.get('txn'); 
  
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get('/packages');
        setAllPackage(res.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  },[axiosSecure]);

  useEffect(() => {
    if (status) {
      if (status === 'success') {
        toast.success(`Package upgraded successfully! Transaction ID: ${txn}`);
      } else if (status === 'failed') {
        toast.error('Payment failed or cancelled. Please try again.');
      } else if (status === 'error') {
        toast.error('An unexpected error in payment processing.');
      }
      navigate(location.pathname, { replace: true });
    }
  }, [status, txn, location.pathname, navigate]);

  const StatusMessage = () => {
    if (status === 'success') {
      return (
        <div className="alert alert-success mt-4">
         <MdCheckCircle size={24} className="text-green-600" />
          <div>
            <h3 className="font-bold">Success!</h3>
            <div className="text-sm">
              Upgrade Successful! Your package limits have been updated.
              Transaction ID: {txn}
            </div>
          </div>
        </div>
      );
    }
    if (status === 'failed' || status === 'error') {
      return (
        <div className="alert alert-error mt-4">
          <MdCancel size={24} className="text-red-600" />
          <div>
            <h3 className="font-bold">Payment Failed!</h3>
            <div className="text-sm">
              Payment failed or an error occurred. Please select a package to
              try again.
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    <span className="loading loading-ring loading-xl text-primary"></span>;
  }

  return (
    <div className="p-6 bg-secondary text-gray-300 rounded-xl shadow-2xl mt-6">
      <h2 className="text-3xl font-extrabold mb-8 text-white border-b border-purple-700 pb-8">
        🚀 Choose Your Upgrade Package
      </h2>
      <StatusMessage />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {allPackage.map((pkg, i) => {
          const isSelected = selectedPackage?.name === pkg.name;
          return (
            <div
              key={i}
              className={`border-2 p-6 rounded-xl text-center transition-all duration-300 transform ${
                pkg.color
              } ${
                isSelected
                  ? 'shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-[1.02] border-purple-500'
                  : 'hover:shadow-lg hover:scale-[1.01] border-[#342757]'
              }`}
            >
              <div className="text-4xl mb-4 text-purple-400">
                <MdAttachMoney className="mx-auto" />
              </div>
              <h3 className="text-3xl font-extrabold mb-3 text-white">
                {pkg.name}
              </h3>
              <div className="flex items-center justify-center space-x-2 text-xl font-bold mb-4">
                <span>Employee Limit: {pkg?.limit || pkg?.employeeLimit}</span>
              </div>

              <div className="text-5xl font-extrabold text-green-400 mb-6">
                ${pkg.price}
              </div>

              <button
                className={`btn w-full font-bold text-lg transition duration-300 ${
                  isSelected
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'btn-outline border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
                }`}
                onClick={() => setSelectedPackage(pkg)}
              >
                {isSelected ? 'Selected' : 'Upgrade Now'}
              </button>
            </div>
          );
        })}
      </div>
      {selectedPackage && (
        <div className="mt-12 p-6 bg-secondary rounded-xl shadow-inner">
          <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-600 pb-2">
            Complete Payment for {selectedPackage.name} ($ {selectedPackage.price})
          </h3>
          <CheckoutForm
            selectedPackage={selectedPackage}
            onCancel={() => setSelectedPackage(null)}
          />
        </div>
      )}
    </div>
  );
};

export default UpgradePackage;
