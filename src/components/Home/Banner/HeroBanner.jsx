import { motion } from 'framer-motion';
import heroImage from '../assets/hero-image.jpg';

const HeroBanner = () => {
  return (
    <section className="relative bg-gray-100 h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Manage Your Corporate Assets Efficiently
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Track, assign, and return company assets with ease. AssetVerse
            streamlines your HR asset management workflow.
          </p>
          <button className="btn btn-primary btn-lg">Get Started</button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={heroImage}
            alt="Asset Management"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
