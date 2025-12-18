import { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { FaMoneyBillWave, FaTimesCircle, FaSpinner } from 'react-icons/fa';
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
    // console.log('Final Data being sent:', paymentData);

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
      className="space-y-6 p-6 bg-[#342757] text-gray-200 rounded-xl shadow-2xl border border-purple-700 mt-4"
    >
      <h3 className="text-2xl font-extrabold text-white flex items-center gap-3 border-b border-gray-600 pb-3">
        <FaMoneyBillWave className="text-green-400" />
        Confirm Upgrade
      </h3>

      <div className="space-y-3 p-4 bg-[#2B233D] rounded-lg border border-purple-800">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Selected Plan:</span>
          <span className="text-purple-400 font-bold">
            {selectedPackage.name}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <span className="text-gray-400">Employee Limit:</span>
          <span className="text-white font-bold">
            {selectedPackage?.limit || selectedPackage?.employeeLimit} Members
          </span>
        </div>
        <div className="flex justify-between items-center border-t border-purple-900 pt-2 mt-2">
          <span className="text-gray-400">Total Amount:</span>
          <span className="text-green-400 font-extrabold text-2xl">
            ${selectedPackage.price}
          </span>
        </div>
      </div>

      <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30">
        <p className="text-xs text-gray-300 leading-relaxed">
          <span className="text-yellow-400 font-bold">Secure Checkout:</span>{' '}
          You will be redirected to Stripe's encrypted payment gateway. Once
          successful, your account limit will be updated automatically.
        </p>
      </div>

      <div className="flex justify-end space-x-4 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline border-red-500 text-red-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300"
          disabled={loading}
        >
          <FaTimesCircle /> Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !user?.email}
          className="btn bg-purple-600 hover:bg-purple-700 border-none px-8 text-white font-bold shadow-lg shadow-purple-500/20 transition-all duration-300 disabled:bg-gray-700"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <FaSpinner className="animate-spin" />
              Redirecting...
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
