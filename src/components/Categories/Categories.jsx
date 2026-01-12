import { motion } from 'framer-motion';
import {
  RiMacbookLine,
  RiShieldFlashLine,
  RiHandCoinLine,
  RiArchiveDrawerLine,
  RiLayoutGridLine,
  RiArrowRightUpLine,
} from 'react-icons/ri';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Computing Devices',
      count: '120+ Assets',
      icon: <RiMacbookLine size={32} />,
      color: 'from-blue-500 to-cyan-400',
      description: 'Laptops, Desktops, and Tablets for employees.',
    },
    {
      id: 2,
      name: 'Security Gear',
      count: '85+ Assets',
      icon: <RiShieldFlashLine size={32} />,
      color: 'from-purple-600 to-pink-500',
      description: 'Access cards, cameras, and safety equipment.',
    },
    {
      id: 3,
      name: 'Office Supplies',
      count: '300+ Items',
      icon: <RiArchiveDrawerLine size={32} />,
      color: 'from-orange-500 to-yellow-400',
      description: 'Essential stationary and furniture assets.',
    },
    {
      id: 4,
      name: 'Financial Tools',
      count: '45+ Assets',
      icon: <RiHandCoinLine size={32} />,
      color: 'from-green-500 to-emerald-400',
      description: 'POS machines, calculators, and hardware.',
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 text-sm font-bold mb-4 border border-purple-500/20"
          >
            <RiLayoutGridLine /> TOP CATEGORIES
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black dark:text-white text-gray-800">
            Explore Asset{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Universes
            </span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer"
            >
              {/* Card Container */}
              <div className="h-full p-8 rounded-[2rem] bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 group-hover:border-purple-500/50 transition-all duration-500">
                {/* Icon Box */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:rotate-6 transition-transform`}
                >
                  {cat.icon}
                </div>

                <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800">
                  {cat.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-white/5">
                  <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">
                    {cat.count}
                  </span>
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 dark:text-white text-gray-600 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <RiArrowRightUpLine size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
