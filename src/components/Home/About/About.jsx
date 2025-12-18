import {
  FaCheckCircle,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const aboutItems = [
  {
    icon: <FaCheckCircle className="text-4xl" />,
    title: 'Prevent Asset Loss',
    description:
      'Track every asset from procurement to retirement to reduce losses and ensure accountability.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: <FaShieldAlt className="text-4xl" />,
    title: 'Secure & Organized',
    description:
      'All employee and asset data is securely stored and easy to access for HR managers.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: <FaChartLine className="text-4xl" />,
    title: 'Analytics & Insights',
    description:
      'Get reports and insights about asset usage, returnable vs non-returnable items, and team management.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: <FaUsers className="text-4xl" />,
    title: 'Employee Management',
    description:
      'Easily manage employees, approve requests, and track asset assignments efficiently.',
    color: 'from-amber-400 to-orange-500',
  },
];

const About = () => {
  return (
    <section className="pt-32 pb-24 bg-[#0B0F1A] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              AssetVerse?
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            A corporate-friendly platform designed to streamline your HR asset
            management with cutting-edge efficiency and security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="relative group h-full"
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-br ${item.color} rounded-3xl opacity-10 group-hover:opacity-30 transition duration-500 blur-sm`}
              ></div>

              <div className="relative h-full bg-[#161B2B] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl backdrop-blur-xl">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {item.description}
                </p>

                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={`h-1 w-12 bg-gradient-to-r ${item.color} rounded-full`}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
