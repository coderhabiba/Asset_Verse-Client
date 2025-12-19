import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-60 transition duration-500"></div>

        
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="relative w-10 h-10 bg-[#161B2B] border border-white/10 rounded-lg flex items-center justify-center overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-sm animate-pulse"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-sm animate-bounce"></div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-xl lg:text-2xl font-black tracking-tighter text-white leading-none">
          ASSET
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            VERSE
          </span>
        </h1>
        <span className="text-[8px] uppercase tracking-[0.3em] text-gray-500 font-bold ml-0.5">
          Management System
        </span>
      </div>
    </Link>
  );
};

export default Logo;
