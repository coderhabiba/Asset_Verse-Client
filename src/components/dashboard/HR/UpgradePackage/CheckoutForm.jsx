import { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import {
  FaMoneyBillWave,
  FaTimesCircle,
  FaSpinner,
  FaLock,
} from 'react-icons/fa';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { AuthContext } from './../../../../context/AuthContext/AuthContext';

const CheckoutForm = ({ selectedPackage, onCancel }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user?.email) {
      toast.error('User email not found. Please log in again.');
      return;
    }
    const paymentData = {
      price: Number(selectedPackage.price),
      packageName: selectedPackage.name,
      employeeLimit: Number(
        selectedPackage?.limit || selectedPackage?.employeeLimit
      ),
      hrEmail: user?.email,
    };

    if (paymentData.price <= 0 || !paymentData.employeeLimit) {
      toast.error('Invalid package data selected.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Connecting to secure payment gateway...');

    try {
      const { data } = await axiosSecure.post(
        '/create-payment-intent',
        paymentData
      );
      toast.dismiss(toastId);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error('Server did not return a payment URL.');
      }
    } catch (err) {
      toast.dismiss(toastId);
      console.error('Payment initiation error:', err);
      toast.error(err.response?.data?.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 bg-[#161926] text-gray-200 rounded-[2rem] shadow-2xl border border-white/5 mt-4"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
          <FaMoneyBillWave className="text-emerald-500" />
          Checkout Summary
        </h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full">
          <FaLock className="text-emerald-500 text-xs" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
            Secure SSL
          </span>
        </div>
      </div>

      <div className="space-y-4 p-6 bg-[#0D0D15] rounded-2xl border border-white/5">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">
            Selected Plan
          </span>
          <span className="text-indigo-400 font-black text-sm uppercase">
            {selectedPackage.name}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">
            Capacity
          </span>
          <span className="text-white font-black text-sm uppercase tracking-tighter">
            {selectedPackage?.limit || selectedPackage?.employeeLimit} Employees
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
          <span className="text-gray-400 font-black text-xs uppercase tracking-widest">
            Total to Pay
          </span>
          <span className="text-emerald-400 font-black text-3xl tracking-tighter">
            ${selectedPackage.price}
          </span>
        </div>
      </div>

      <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/20">
        <p className="text-[11px] text-gray-400 leading-relaxed text-center">
          By clicking pay, you will be redirected to{' '}
          <span className="text-white font-bold italic underline decoration-indigo-500">
            Stripe
          </span>{' '}
          for a secure transaction. Your limits will be updated instantly upon
          success.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 text-gray-400 hover:bg-white/10 transition-all duration-300 font-bold text-xs uppercase tracking-widest border border-white/5"
          disabled={loading}
        >
          <FaTimesCircle className="text-red-500/70" /> Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !user?.email}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300 disabled:opacity-50 disabled:grayscale"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <FaSpinner className="animate-spin text-lg" />
              Processing...
            </span>
          ) : (
            `Pay $${selectedPackage.price} Now`
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
