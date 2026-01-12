import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 dark:text-gray-300 text-gray-700 leading-relaxed">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8 dark:text-white text-gray-900"
      >
        Terms of Service
      </motion.h1>
      <h2 className="text-2xl font-bold mt-8 mb-4 dark:text-pink-400 text-pink-600">
        Usage Agreement
      </h2>
      <p className="mb-4">
        By using Asset Verse, you agree to comply with our corporate asset
        management guidelines.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4 dark:text-pink-400 text-pink-600">
        Prohibited Actions
      </h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Unauthorized access to other company dashboards.</li>
        <li>Submitting fraudulent asset requests.</li>
        <li>Redistributing the platform's proprietary analytics.</li>
      </ul>
    </div>
  );
};
export default Terms;
