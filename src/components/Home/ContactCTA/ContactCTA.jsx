import { motion } from 'framer-motion';

const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <motion.div
        className="container mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Ready to streamline your asset management?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Contact us anytime — we're here to help your company manage smarter.
        </p>

        <a
          href="mailto:support@assetverse.com"
          className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
      </motion.div>
    </section>
  );
};

export default ContactCTA;
