import {
  FaCheckCircle,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
} from 'react-icons/fa';

const aboutItems = [
  {
    icon: <FaCheckCircle className="text-primary text-4xl mb-4" />,
    title: 'Prevent Asset Loss',
    description:
      'Track every asset from procurement to retirement to reduce losses and ensure accountability.',
  },
  {
    icon: <FaShieldAlt className="text-primary text-4xl mb-4" />,
    title: 'Secure & Organized',
    description:
      'All employee and asset data is securely stored and easy to access for HR managers.',
  },
  {
    icon: <FaChartLine className="text-primary text-4xl mb-4" />,
    title: 'Analytics & Insights',
    description:
      'Get reports and insights about asset usage, returnable vs non-returnable items, and team management.',
  },
  {
    icon: <FaUsers className="text-primary text-4xl mb-4" />,
    title: 'Employee Management',
    description:
      'Easily manage employees, approve requests, and track asset assignments efficiently.',
  },
];

const About = () => {
  return (
    <section className="pt-28 pb-20">
      <div className="max-w-[80%] mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-primary">
          Why Choose AssetVerse?
        </h2>
        <p className="text-lg mb-12 text-gray-300">
          A corporate-friendly platform designed to streamline your HR asset
          management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#0E131F] border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg transform hover:-translate-y-4 transition duration-500 ease-out hover:bg-[#25134e4b] hover:border-[#5b0ed896]"
            >
              <div className="flex flex-col items-center">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-100">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
