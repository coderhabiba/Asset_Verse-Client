import { motion } from 'framer-motion';

const Cookies = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 dark:text-gray-300 text-gray-700 leading-relaxed">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8 dark:text-white text-gray-900"
      >
        Cookie Policy
      </motion.h1>
      <p className="mb-4">
        We use cookies to improve your dashboard experience and remember your
        theme preferences.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-bold mb-2">Essential Cookies</h3>
          <p className="text-sm">
            Necessary for login sessions and security authentication.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-bold mb-2">Preference Cookies</h3>
          <p className="text-sm">
            Used to store your Light/Dark mode and language settings.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Cookies;
