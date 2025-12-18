import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

const ErrorPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4 bg-[#0B0F1A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative inline-block"
        >
          <h1 className="text-[150px] md:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-500/20 to-transparent leading-none select-none">
            404
          </h1>
          <motion.img
            src="https://i.ibb.co/3vMBDYp/error-illustration.png"
            alt="Not Found"
            className="w-64 md:w-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Lost in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              AssetVerse?
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The page you're looking for has been moved to another universe or
            never existed.
          </p>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-[0_15px_30px_-10px_rgba(124,58,237,0.5)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-500 -translate-x-full"></div>
              <HiOutlineArrowNarrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
              <span className="tracking-widest uppercase text-sm">
                Back to Safety
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8">
        <div className="w-1.5 h-1.5 bg-purple-500/30 rounded-full animate-ping"></div>
        <div className="w-1.5 h-1.5 bg-pink-500/30 rounded-full animate-ping delay-75"></div>
        <div className="w-1.5 h-1.5 bg-indigo-500/30 rounded-full animate-ping delay-150"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
