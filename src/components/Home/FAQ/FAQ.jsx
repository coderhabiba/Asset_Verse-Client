import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    q: 'What is AssetVerse?',
    a: 'It is a state-of-the-art corporate asset management platform designed specifically for HR teams and employees to track, manage, and optimize company resources.',
  },
  {
    q: 'Is there any free package?',
    a: 'Absolutely! HR managers can start with our Basic package, which allows management for up to 5 employees at no cost.',
  },
  {
    q: 'Can employees request assets?',
    a: 'Yes, employees have a dedicated dashboard where they can request new assets, track pending approvals, and view their currently assigned items.',
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = i => {
    setOpen(open === i ? null : i);
  };

  return (
    <section className="pb-32 pt-16 bg-[#0B0F1A]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Got{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Questions?
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about AssetVerse
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i
                  ? 'bg-[#161B2B] border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                  : 'bg-[#161B2B]/40 border-white/5 hover:border-white/20'
              }`}
            >
              <button
                className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggle(i)}
              >
                <span
                  className={`text-lg font-bold transition-colors duration-300 ${
                    open === i ? 'text-purple-400' : 'text-gray-200'
                  }`}
                >
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-xl ${
                    open === i ? 'text-purple-400' : 'text-gray-500'
                  }`}
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
