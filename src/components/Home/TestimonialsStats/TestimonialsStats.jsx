import { motion } from 'framer-motion';
import { FaBuilding, FaUsers, FaLaptop, FaSmile } from 'react-icons/fa';

const testimonials = [
  {
    name: 'John Carter',
    role: 'HR Manager, NovaTech',
    review:
      'AssetVerse has streamlined our asset management process. Assigning & tracking items has never been this easy!',
    img: 'https://ibb.co.com/bM9PndNM',
  },
  {
    name: 'Sophia Reynolds',
    role: 'Operations Head, BlueWave',
    review:
      'Our team productivity increased significantly. The approval workflow is simple and saves us hours every week.',
    img: 'https://ibb.co.com/GvzR9vB8',
  },
  {
    name: 'Michael Chen',
    role: 'Team Lead, Orion Corp',
    review:
      'A modern and professional solution. Reports and insights help us make better decisions about asset distribution.',
    img: 'https://ibb.co.com/GvzR9vB8',
  },
];

const stats = [
  {
    icon: <FaBuilding className="text-3xl" />,
    value: '100+',
    label: 'Companies Trust Us',
  },
  {
    icon: <FaUsers className="text-3xl" />,
    value: '1,000+',
    label: 'Active Employees',
  },
  {
    icon: <FaLaptop className="text-3xl" />,
    value: '10,000+',
    label: 'Total Assets Tracked',
  },
  {
    icon: <FaSmile className="text-3xl" />,
    value: '98%',
    label: 'User Satisfaction',
  },
];

const TestimonialsStats = () => {
  return (
    <section className="pb-20 pt-14">
      <div className="container mx-auto px-4">
        {/* title */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl text-gray-300 font-bold">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 mt-2">Trusted by companies worldwide</p>
        </motion.div>

        {/* testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="bg-[#5a2b9927] rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-300">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{t.review}</p>
            </motion.div>
          ))}
        </div>

        {/* states */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-16 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="p-6 bg-[#a481e60c] shadow-md rounded-xl hover:shadow-lg transition"
            >
              <div className="text-primary mb-2 flex justify-center">
                {s.icon}
              </div>
              <h3 className="text-2xl text-gray-300 font-bold">{s.value}</h3>
              <p className="text-gray-600 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStats;
