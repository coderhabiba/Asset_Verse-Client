import { motion } from 'framer-motion';
import { FaBuilding, FaUsers, FaLaptop, FaSmile } from 'react-icons/fa';

const testimonials = [
  {
    name: 'John Carter',
    role: 'HR Manager, NovaTech',
    review:
      'AssetVerse has streamlined our asset management process. Assigning & tracking items has never been this easy!',
    img: 'https://i.pravatar.cc/150?u=john',
  },
  {
    name: 'Sophia Reynolds',
    role: 'Operations Head, BlueWave',
    review:
      'Our team productivity increased significantly. The approval workflow is simple and saves us hours every week.',
    img: 'https://i.pravatar.cc/150?u=sophia',
  },
  {
    name: 'Michael Chen',
    role: 'Team Lead, Orion Corp',
    review:
      'A modern and professional solution. Reports and insights help us make better decisions about asset distribution.',
    img: 'https://i.pravatar.cc/150?u=michael',
  },
];

const stats = [
  {
    icon: <FaBuilding className="text-3xl" />,
    value: '100+',
    label: 'Companies Trust Us',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: <FaUsers className="text-3xl" />,
    value: '1,000+',
    label: 'Active Employees',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    icon: <FaLaptop className="text-3xl" />,
    value: '10,000+',
    label: 'Total Assets Tracked',
    gradient: 'from-orange-500 to-yellow-400',
  },
  {
    icon: <FaSmile className="text-3xl" />,
    value: '98%',
    label: 'User Satisfaction',
    gradient: 'from-green-500 to-emerald-400',
  },
];

const TestimonialsStats = () => {
  return (
    <section className="pb-24 pt-16 bg-[#0B0F1A]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Clients Say
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 text-lg">
            Trusted by forward-thinking companies worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-300 blur"></div>
              <div className="relative bg-[#161B2B] rounded-2xl p-8 h-full border border-white/5 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/50 p-0.5"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white rounded-full p-1 border-2 border-[#161B2B]">
                      <FaSmile className="text-[10px]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white group-hover:text-purple-400 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {t.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-24 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 bg-[#161B2B]/50 border border-white/5 rounded-3xl text-center hover:bg-[#161B2B] transition-all duration-300 group"
            >
              <div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${s.gradient} bg-opacity-10 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20`}
              >
                <span className="text-white">{s.icon}</span>
              </div>
              <h3 className="text-4xl text-white font-black mb-2 tracking-tight">
                {s.value}
              </h3>
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStats;
