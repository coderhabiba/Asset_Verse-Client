import { motion } from 'framer-motion';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const Status = () => {
  const services = [
    { name: 'User Authentication', status: 'Operational' },
    { name: 'Database API', status: 'Operational' },
    { name: 'Asset Image Hosting', status: 'Operational' },
    { name: 'Payment Gateway', status: 'Operational' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-4 dark:text-white text-gray-900"
      >
        System Status
      </motion.h1>
      <div className="flex items-center gap-2 text-green-500 font-bold mb-12">
        <RiCheckboxCircleFill size={24} /> All Systems Operational
      </div>

      <div className="space-y-4">
        {services.map(s => (
          <div
            key={s.name}
            className="flex justify-between p-6 rounded-2xl bg-white/5 border border-white/10 items-center"
          >
            <span className="font-medium dark:text-gray-200">{s.name}</span>
            <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-500 font-bold uppercase tracking-widest">
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Status;
