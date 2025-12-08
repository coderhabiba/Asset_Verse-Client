import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowRight,
} from 'react-icons/fa';
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0F1521] via-[#030306] to-[#0F1521] text-white pt-20 pb-8">
      <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full border border-purple-500">
              <img src={logo} alt="" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">ASSETVERSE</p>
              <p className="text-sm text-gray-400">Asset Management System</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted partner in asset management excellence. We help
            organizations optimize their asset lifecycle, reduce costs, and
            improve operational efficiency with cutting edge technology and
            expert support.
          </p>
          <div className="flex space-x-3 pt-2">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaTwitter />} />
            <SocialIcon icon={<FaLinkedinIn />} />
            <SocialIcon icon={<FaInstagram />} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-l-4 border-purple-700 pl-2 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <LinkItem text="Home" />
            <LinkItem text="Dashboard" />
            <LinkItem text="Join as Employee" />
            <LinkItem text="Join as HR Manager" />
            <LinkItem text="Login" />
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-l-4 border-purple-700 pl-2 mb-4">
            Our Services
          </h3>
          <ul className="space-y-3">
            <LinkItem text="Asset Tracking" />
            <LinkItem text="Inventory Management" />
            <LinkItem text="Maintenance Scheduling" />
            <LinkItem text="Analytics & Reporting" />
            <LinkItem text="Employee Management" />
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-l-4 border-purple-700 pl-2 mb-4">
            Contact Info
          </h3>
          <ContactItem
            icon={<IoLocationOutline />}
            text="1/3 Business Street, Ixoth City, IL 12345"
          />
          <ContactItem
            icon={<IoCallOutline />}
            text="+1 (555) 123-4567"
            subtext="+1 (555) 987-6543"
          />
          <ContactItem
            icon={<IoMailOutline />}
            text="info@assetverse.com"
            subtext="support@assetversa.com"
          />
          <ContactItem
            icon={<IoTimeOutline />}
            text="Mon - Fri: 9:00 AM - 6:00 PM"
            subtext="Sat: 11:00 AM - 4:00 PM"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 text-gray-400 text-sm">
        <p className="mb-4 md:mb-0">© 2025 ASSETVERSE. All Rights Reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-purple-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-purple-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-purple-400">
            Cookie Policy
          </a>
          <a href="#" className="hover:text-purple-400">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for Reusability

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-purple-700 transition duration-300"
  >
    {icon}
  </a>
);

const LinkItem = ({ text }) => (
  <li>
    <a
      href="#"
      className="group flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
    >
      <span className="mr-2 text-purple-600 transition-all duration-300 group-hover:text-purple-400 group-hover:translate-x-1">
        <FaArrowRight />
      </span>
      {text}
    </a>
  </li>
);

// ContactItem কম্পোনেন্ট আপডেট করা হয়েছে
const ContactItem = ({ icon, text, subtext }) => (
  <div className="flex items-start mt-4">
    <div
      className="text-purple-500 text-xl mr-3 p-2 rounded-lg flex-shrink-0 
      bg-[#1F0C34] flex items-center justify-center h-10 w-10" // নতুন BG ক্লাস এবং স্টাইলিং যোগ করা হলো
    >
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-sm">{text}</p>
      {subtext && <p className="text-gray-400 text-sm">{subtext}</p>}
    </div>
  </div>
);

export default Footer;
