import {
  FaCheckCircle,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const aboutItems = [
  {
    icon: <FaCheckCircle className="text-4xl text-white" />,
    title: 'Prevent Asset Loss',
    description:
      'Track every asset from procurement to retirement to reduce losses and ensure accountability.',
    color: 'from-cyan-400 to-blue-500',
    lightBg: 'bg-blue-50',
  },
  {
    icon: <FaShieldAlt className="text-4xl text-white" />,
    title: 'Secure & Organized',
    description:
      'All employee and asset data is securely stored and easy to access for HR managers.',
    color: 'from-purple-500 to-indigo-600',
    lightBg: 'bg-purple-50',
  },
  {
    icon: <FaChartLine className="text-4xl text-white" />,
    title: 'Analytics & Insights',
    description:
      'Get reports and insights about asset usage, returnable vs non-returnable items, and team management.',
    color: 'from-pink-500 to-rose-600',
    lightBg: 'bg-pink-50',
  },
  {
    icon: <FaUsers className="text-4xl text-white" />,
    title: 'Employee Management',
    description:
      'Easily manage employees, approve requests, and track asset assignments efficiently.',
    color: 'from-amber-400 to-orange-500',
    lightBg: 'bg-orange-50',
  },
];

const About = () => {
  return (
    <section className="pt-32 pb-24 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              AssetVerse?
            </span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
            A corporate-friendly platform designed to streamline your HR asset
            management with cutting-edge efficiency and security.
          </p>
        </motion.div>

        {/* Cards Grid */}
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
              {/* Outer Glow / Gradient Border */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-br ${item.color} rounded-3xl opacity-0 group-hover:opacity-20 dark:group-hover:opacity-40 transition duration-500 blur-sm`}
              ></div>

              {/* Main Card */}
              <div className="relative h-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl dark:shadow-none backdrop-blur-sm">
                {/* Icon Box */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-all duration-300 group-hover:scale-110`}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed font-semibold">
                  {item.description}
                </p>

                {/* Hover Decoration Line */}
                <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={`h-1.5 w-12 bg-gradient-to-r ${item.color} rounded-full shadow-sm`}
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
