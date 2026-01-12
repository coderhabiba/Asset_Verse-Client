import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 dark:text-gray-300 text-gray-700 leading-relaxed">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8 dark:text-white text-gray-900"
      >
        Privacy Policy
      </motion.h1>
      <p className="mb-4">
        At Asset Verse, we prioritize your data security. This policy outlines
        how we collect and use your company's asset data.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4 dark:text-purple-400 text-purple-600">
        Data Collection
      </h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>User profile information (Name, Email, Role).</li>
        <li>Asset tracking details and history.</li>
        <li>Company inventory management data.</li>
      </ul>
      <p className="mt-6">
        We never share your private data with third-party vendors without
        explicit consent.
      </p>
    </div>
  );
};
export default Privacy;
