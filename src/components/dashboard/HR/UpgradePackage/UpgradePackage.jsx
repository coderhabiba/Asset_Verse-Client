import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MdAttachMoney,
  MdCheckCircle,
  MdCancel,
  MdUpgrade,
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
  }, [axiosSecure]);

  useEffect(() => {
    if (status) {
      if (status === 'success') {
        toast.success(`Package upgraded successfully! Transaction ID: ${txn}`);
      } else if (status === 'failed') {
        toast.error('Payment failed or cancelled.');
      }
      navigate(location.pathname, { replace: true });
    }
  }, [status, txn, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#0D0D15] rounded-3xl border border-white/5 shadow-2xl mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-8 gap-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <MdUpgrade className="text-indigo-500" /> Upgrade Plan
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Scale your business with higher employee limits
          </p>
        </div>
      </div>

      {status === 'success' && (
        <div className="mb-8 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
          <MdCheckCircle className="text-emerald-500 text-3xl" />
          <div>
            <h4 className="text-emerald-500 font-bold">Upgrade Successful!</h4>
            <p className="text-emerald-500/80 text-sm font-mono">TXN: {txn}</p>
          </div>
        </div>
      )}

      {(status === 'failed' || status === 'error') && (
        <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4">
          <MdCancel className="text-red-500 text-3xl" />
          <div>
            <h4 className="text-red-500 font-bold">Payment Failed</h4>
            <p className="text-red-500/80 text-sm">
              Please try again or choose another package.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {allPackage.map((pkg, i) => {
          const isSelected = selectedPackage?._id === pkg._id;
          return (
            <div
              key={i}
              className={`relative overflow-hidden group p-8 rounded-[2rem] transition-all duration-500 border ${
                isSelected
                  ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.15)] scale-[1.03]'
                  : 'bg-[#161926] border-white/5 hover:border-white/20 hover:scale-[1.02]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 p-3">
                  <MdCheckCircle className="text-indigo-500 text-2xl" />
                </div>
              )}

              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                <MdAttachMoney className="text-3xl text-indigo-400" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">
                {pkg.name}
              </h3>
              <p className="text-gray-500 text-sm font-bold mb-6 uppercase tracking-widest">
                Up to {pkg?.limit || pkg?.employeeLimit} Employees
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-white">
                  ${pkg.price}
                </span>
                <span className="text-gray-500 font-bold">/lifetime</span>
              </div>

              <button
                onClick={() => setSelectedPackage(pkg)}
                className={`w-full py-4 rounded-2xl font-black transition-all duration-300 uppercase tracking-widest text-xs ${
                  isSelected
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {isSelected ? 'Selected Plan' : 'Select Package'}
              </button>
            </div>
          );
        })}
      </div>

      {selectedPackage && (
        <div className="mt-12 p-8 bg-[#11111D] border border-indigo-500/30 rounded-[2.5rem] shadow-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-2xl font-black text-white">
                Secure Checkout
              </h3>
              <p className="text-gray-500 text-sm">
                You've selected the{' '}
                <span className="text-indigo-400 font-bold">
                  {selectedPackage.name}
                </span>{' '}
                plan
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-white">
                ${selectedPackage.price}
              </p>
              <button
                onClick={() => setSelectedPackage(null)}
                className="text-xs text-red-400 font-bold uppercase tracking-tighter hover:text-red-300"
              >
                Change Plan
              </button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <CheckoutForm
              selectedPackage={selectedPackage}
              onCancel={() => setSelectedPackage(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpgradePackage;
