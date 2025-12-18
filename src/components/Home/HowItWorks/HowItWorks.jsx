import { motion } from 'framer-motion';
import { FaUserShield, FaBoxOpen, FaChartLine } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserShield />,
      title: 'Register as HR Manager',
      desc: 'Create your company profile & access the comprehensive dashboard instantly.',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: <FaBoxOpen />,
      title: 'Add & Assign Assets',
      desc: 'Upload assets, categorize them by type, & assign to employees with a few clicks.',
      color: 'from-pink-500 to-purple-600',
    },
    {
      icon: <FaChartLine />,
      title: 'Track & Monitor',
      desc: 'Monitor real-time status, asset lifecycle history, & generate insightful reports.',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section className="pb-32 pt-16 bg-[#0B0F1A]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            How{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              AssetVerse
            </span>{' '}
            Works
          </h2>
          <p className="text-gray-400 text-lg">
            Three simple steps to digitize your inventory
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-transparent rounded-full"></div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot on the line */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#0B0F1A] border-4 border-purple-500 rounded-full z-10 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-5/12 ml-12 md:ml-0">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-[#161B2B] border border-white/5 p-8 rounded-3xl shadow-2xl relative group overflow-hidden"
                  >
                    <div
                      className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${step.color}`}
                    ></div>

                    <div
                      className={`text-3xl mb-4 inline-block p-3 rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg`}
                    >
                      {step.icon}
                    </div>

                    <h3 className="text-2xl text-white font-bold mb-3 group-hover:text-purple-400 transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                  </motion.div>
                </div>

                {/* Spacer for MD screens */}
                <div className="hidden md:block md:w-2/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
