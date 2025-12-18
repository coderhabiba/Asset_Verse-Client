import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4">
      {/* image */}
      <motion.img
        src="https://ibb.co.com/pvJjhyhr"
        alt="Not Found"
        className="w-80 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Text */}
      <motion.h1
        className="text-4xl font-bold text-gray-300 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Page Not Found
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mb-6 text-center max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </motion.p>

      <motion.a
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg shadow transition"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Back To Home
      </motion.a>
    </div>
  );
};

export default ErrorPage;
