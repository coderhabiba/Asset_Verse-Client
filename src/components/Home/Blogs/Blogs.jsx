import { motion } from 'framer-motion';
import { RiArrowRightLine, RiCalendarLine, RiUserLine } from 'react-icons/ri';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Optimizing Corporate Asset Tracking in 2026',
      excerpt:
        'Learn how modern businesses are moving from spreadsheets to automated asset management systems.',
      author: 'Admin',
      date: 'Jan 10, 2026',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
      tag: 'Management',
    },
    {
      id: 2,
      title: 'The Impact of AI on Inventory Precision',
      excerpt:
        'AI is revolutionizing how we predict maintenance and track high-value equipment across departments.',
      author: 'Tech Team',
      date: 'Jan 08, 2026',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
      tag: 'Technology',
    },
    {
      id: 3,
      title: 'Security Protocols for Employee Devices',
      excerpt:
        'Practical steps for HR managers to ensure company assets remain secure in a remote work environment.',
      author: 'Security Div',
      date: 'Jan 05, 2026',
      image:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      tag: 'Security',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-600/10 blur-[120px] rounded-full -z-10"></div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-500 bg-clip-text text-transparent"
            >
              Latest Insights & <span className="text-purple-500">Blogs</span>
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Explore the latest trends in asset management, workplace
              efficiency, and corporate technology.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-purple-500/30 rounded-xl text-purple-500 font-bold hover:bg-purple-500/10 transition-all flex items-center gap-2"
          >
            View All Posts <RiArrowRightLine />
          </motion.button>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              {/* Image Section */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  {post.tag}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <RiUserLine className="text-purple-500" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RiCalendarLine className="text-purple-500" /> {post.date}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <button className="text-sm font-bold flex items-center gap-2 text-purple-500 group-hover:gap-4 transition-all">
                  READ MORE <RiArrowRightLine />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
