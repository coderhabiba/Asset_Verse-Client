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
    icon: <FaClipboardList className="text-4xl" />,
    title: 'Centralized Inventory',
    desc: 'Keep all company assets in one place — easy to search, filter and manage.',
  },
  {
    icon: <FaSyncAlt className="text-4xl" />,
    title: 'Request & Approval Workflow',
    desc: 'Employees request assets, HR approves or rejects — streamlined and auditable.',
  },
  {
    icon: <FaShieldAlt className="text-4xl" />,
    title: 'Secure Access',
    desc: 'Role-based access ensures only authorized HR managers can modify inventory.',
  },
  {
    icon: <FaChartPie className="text-4xl" />,
    title: 'Analytics & Reports',
    desc: 'View top requested items, returnable vs non-returnable distribution, and more.',
  },
  {
    icon: <FaHeadset className="text-4xl" />,
    title: 'Priority Support',
    desc: 'Basic support included; upgrade packages to get priority help and onboarding.',
  },
  {
    icon: <FaMobileAlt className="text-4xl" />,
    title: 'Mobile Friendly',
    desc: 'Responsive UI so teams can request and check assets from any device.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

const FeaturesShowcase = () => {
  return (
    <section className="py-20">
      <div className="max-w-[80%] mx-auto px-4 text-center">
        <h2 className="text-3xl text-gray-300 md:text-4xl font-bold mb-3">
          Key Features
        </h2>
        <p className="text-gray-400 mb-10">
          Everything HR needs to manage corporate assets — simple, secure and
          scalable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
              className="bg-[#0E131F] border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg transform hover:-translate-y-4 transition duration-500 ease-out hover:bg-[#25134e4b] hover:border-[#5b0ed896]"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-[#5007d834] to-[#5903dbb9] flex items-center justify-center text-primary">
                  {f.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-300 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
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
