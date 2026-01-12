import { useEffect, useState } from 'react';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get('/packages')
      .then(data => {
        setPackages(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch packages:', err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <span className="loading loading-ring loading-lg text-purple-600"></span>
        <p className="text-gray-400 animate-pulse font-medium">
          Fetching best plans for you...
        </p>
      </div>
    );
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Perfect Package
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            Flexible subscription plans designed to scale with your business
            size and asset management needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-600 to-pink-600 rounded-3xl opacity-10 group-hover:opacity-40 transition duration-500 blur"></div>

              <div className="relative h-full bg-[#161B2B] border border-white/5 rounded-3xl p-10 flex flex-col shadow-2xl backdrop-blur-xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-white mb-2 group-hover:text-purple-400 transition-colors uppercase tracking-wide">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">
                      / Lifetime
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl mb-8 border border-white/5">
                  <p className="text-gray-300 font-bold text-center">
                    Up to{' '}
                    <span className="text-purple-400 text-xl mx-1">
                      {pkg.employeeLimit}
                    </span>{' '}
                    Employees
                  </p>
                </div>

                <ul className="text-gray-400 mb-10 space-y-4 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="text-purple-500 mt-1 flex-shrink-0" />
                      <span className="text-sm font-medium leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-2xl shadow-xl hover:shadow-purple-600/20 transition-all duration-300 uppercase tracking-widest text-sm"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
