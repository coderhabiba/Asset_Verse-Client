import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import banner1 from '../../../assets/banner-1.jpg';
import banner2 from '../../../assets/banner-2.jpg';
import banner3 from '../../../assets/banner-3.jpg';
import { Link } from 'react-router-dom';

const banners = [
  {
    title: 'AssetVerse - Smart Asset Management',
    description:
      "Streamline your company's asset tracking with our comprehensive HR management platform.",
    btnText: 'Join As HR Manager',
    path: '/join-hr',
    img: banner1,
  },
  {
    title: 'Track Your Assets Seamlessly',
    description:
      'Employees can easily request, track, and manage their assigned assets efficiently.',
    btnText: 'Join As Employee',
    path: '/join-employee',
    img: banner2,
  },
  {
    title: 'Complete Asset Lifecycle Management',
    description:
      "From procurement to retirement, manage every aspect of your company's assets.",
    btnText: 'Get Started Now',
    path: '/login',
    img: banner3,
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[650px] md:h-[750px] w-full overflow-hidden bg-[#0B0F1A]">
      <AnimatePresence mode="wait">
        {banners.map((banner, index) =>
          index === current ? (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-full object-cover opacity-60"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-black/40 to-transparent flex flex-col items-center justify-center text-center px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-4xl"
                >
                  <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                    {banner.title.split(' - ')[0]}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                      {banner.title.split(' - ')[1]}
                    </span>
                  </h1>

                  <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                    {banner.description}
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={banner.path}
                      className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-[0_10px_30px_-10px_rgba(147,51,234,0.5)] hover:shadow-purple-500/40 transition-all duration-300"
                    >
                      {banner.btnText}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              current === i
                ? 'w-10 h-3 bg-purple-500'
                : 'w-3 h-3 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
