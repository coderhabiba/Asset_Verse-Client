import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import banner1 from '../../../assets/banner-1.jpg';
import banner2 from '../../../assets/banner-2.jpg';
import banner3 from '../../../assets/banner-3.jpg';

const banners = [
  {
    title: 'AssetVerse - Smart Asset Management',
    description:
      "Streamline your company's asset tracking with our comprehensive HR management platform.",
    btnText: 'Join As HR Manager',
    img: banner1,
  },
  {
    title: 'Track Your Assets Seamlessly',
    description:
      'Employees can easily request, track, and manage their assigned assets.',
    btnText: 'Join As Employee',
    img: banner2,
  },
  {
    title: 'Complete Asset Lifecycle Management',
    description:
      "From procurement to retirement, manage every aspect of your company's assets.",
    btnText: 'Get Started',
    img: banner3,
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  // auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <AnimatePresence>
        {banners.map((banner, index) =>
          index === current ? (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1 }}
            >
              {/* image */}
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-full object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 md:px-20">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {banner.title}
                </h1>
                <p className="text-lg md:text-xl text-white mb-6">
                  {banner.description}
                </p>
                <button className="btn btn-primary btn-lg">
                  {banner.btnText}
                </button>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroBanner;
