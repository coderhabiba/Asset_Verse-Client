import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';

const ContactCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0B0F1A]">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 blur-[130px] rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#161B2B] to-[#0B0F1A] border border-white/10 p-10 md:p-20 rounded-[40px] shadow-2xl overflow-hidden text-center group"
        >
          {/* Animated Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-3xl mb-8 shadow-xl shadow-purple-500/20 transform group-hover:rotate-12 transition-transform duration-500">
              <FaEnvelope />
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Ready to streamline your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500">
                Asset Management?
              </span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
              Join hundreds of companies that manage their inventory smarter and
              faster with AssetVerse.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px -10px rgba(147, 51, 234, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                href="mailto:support@assetverse.com"
                className="group relative flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black px-10 py-5 rounded-2xl transition-all duration-300 overflow-hidden"
              >
                <span>Get In Touch</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <button className="text-gray-300 font-bold hover:text-white transition-colors">
                View Documentation
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
