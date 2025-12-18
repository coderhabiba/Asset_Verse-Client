import { motion } from 'framer-motion';
import { FaUserShield, FaBoxOpen, FaChartLine } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <section className="pb-20 pt-10">
      <div className="max-w-[60%] mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-primary mb-14">
          How AssetVerse Works
        </h2>

        <div className="relative border-l-4 border-purple-500 ml-6">
          <motion.div
            className="mb-14 ml-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <FaUserShield className="text-purple-600 text-3xl" />
              <h3 className="text-2xl text-gray-300 font-semibold">Register as HR Manager</h3>
            </div>
            <p className="text-gray-500">
              Create your company profile & access the dashboard instantly.
            </p>
          </motion.div>

          <motion.div
            className="mb-14 ml-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <FaBoxOpen className="text-purple-600 text-3xl" />
              <h3 className="text-2xl text-gray-300 font-semibold">Add & Assign Assets</h3>
            </div>
            <p className="text-gray-500">
              Upload assets, categorize them & assign to employees easily.
            </p>
          </motion.div>

          <motion.div
            className="ml-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <FaChartLine className="text-purple-600 text-3xl" />
              <h3 className="text-2xl text-gray-300 font-semibold">Track & Monitor</h3>
            </div>
            <p className="text-gray-500">
              Real-time tracking, asset lifecycle history & analytics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
