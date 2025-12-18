import { motion } from 'framer-motion';
import {
  FaClipboardList,
  FaSyncAlt,
  FaShieldAlt,
  FaHeadset,
  FaChartPie,
  FaMobileAlt,
} from 'react-icons/fa';

const features = [
  {
    icon: <FaClipboardList />,
    title: 'Centralized Inventory',
    desc: 'Keep all company assets in one place — easy to search, filter and manage.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: <FaSyncAlt />,
    title: 'Request & Approval',
    desc: 'Employees request assets, HR approves or rejects — streamlined and auditable.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Secure Access',
    desc: 'Role-based access ensures only authorized HR managers can modify inventory.',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    icon: <FaChartPie />,
    title: 'Analytics & Reports',
    desc: 'View top requested items, returnable vs non-returnable distribution, and more.',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: <FaHeadset />,
    title: 'Priority Support',
    desc: 'Basic support included; upgrade packages to get priority help and onboarding.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: <FaMobileAlt />,
    title: 'Mobile Friendly',
    desc: 'Responsive UI so teams can request and check assets from any device.',
    color: 'from-pink-400 to-rose-600',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const FeaturesShowcase = () => {
  return (
    <section className="py-24 bg-[#0B0F1A]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Powerful{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Features
            </span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything HR needs to manage corporate assets — simple, secure and
            scalable for modern teams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl opacity-20 group-hover:opacity-100 group-hover:from-purple-500 group-hover:to-pink-500 transition duration-500 blur-sm"></div>

              <div className="relative bg-[#161B2B] border border-white/5 rounded-3xl p-8 h-full transition-all duration-300">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg transform group-hover:-rotate-6 transition-transform duration-300`}
                >
                  {f.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {f.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm">
                  {f.desc}
                </p>

                <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <span className="ml-2">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
