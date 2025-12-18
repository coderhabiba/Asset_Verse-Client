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
import logo from '../../assets/logo.png';
import { Link, NavLink } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0F1521] via-[#030306] to-[#0F1521] text-white pt-20 pb-8">
      {/* top part */}
      <div className="max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        {/* logo */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full border border-purple-500 overflow-hidden">
              <img src={logo} alt="Logo" />
            </div>
            <div>
              <p className="text-xl font-bold text-primary">ASSETVERSE</p>
              <p className="text-sm text-gray-400">Asset Management System</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted partner in asset management excellence. We help
            organizations optimize asset lifecycle, reduce costs, and improve
            operational efficiency using advanced technology.
          </p>

          <div className="flex space-x-3 pt-2">
            <SocialIcon to="#" icon={<FaFacebookF />} />
            <SocialIcon to="#" icon={<FaTwitter />} />
            <SocialIcon to="#" icon={<FaLinkedinIn />} />
            <SocialIcon to="#" icon={<FaInstagram />} />
          </div>
        </div>

        {/* quick links */}
        <div>
          <h3 className="text-lg font-semibold border-l-4 border-purple-700 pl-2 mb-4">
            Quick Links
          </h3>

          <ul className="flex flex-col space-y-3">
            <li>
              <NavLink to="/">
                <LinkItem text="Home" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">
                <LinkItem text="Dashboard" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/join-employee">
                <LinkItem text="Join as Employee" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/join-hr">
                <LinkItem text="Join as HR Manager" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <LinkItem text="Login" />
              </NavLink>
            </li>
          </ul>
        </div>

        {/* services */}
        <div>
          <h3 className="text-lg font-semibold border-l-4 border-purple-700 pl-2 mb-4">
            Our Services
          </h3>

          <ul className="space-y-3">
            <li>
              <LinkItem text="Asset Tracking" />
            </li>
            <li>
              <LinkItem text="Inventory Management" />
            </li>
            <li>
              <LinkItem text="Maintenance Scheduling" />
            </li>
            <li>
              <LinkItem text="Analytics & Reporting" />
            </li>
            <li>
              <LinkItem text="Employee Management" />
            </li>
          </ul>
        </div>

        {/* contact */}
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

      {/* bottom part */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 text-gray-400 text-sm">
        <p className="mb-4 md:mb-0">© 2025 ASSETVERSE. All Rights Reserved.</p>

        <div className="flex space-x-4">
          <Link className="hover:text-purple-400">Privacy Policy</Link>
          <Link className="hover:text-purple-400">Terms of Service</Link>
          <Link className="hover:text-purple-400">Cookie Policy</Link>
          <Link className="hover:text-purple-400">Support</Link>
        </div>
      </div>
    </footer>
  );
};

/* ------------------- social icon ------------------- */
const SocialIcon = ({ to, icon }) => (
  <Link
    to={to}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-purple-700 transition duration-300"
  >
    {icon}
  </Link>
);

/* ------------------- link item ------------------- */
const LinkItem = ({ text }) => (
  <div className="group flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300 cursor-pointer">
    <span className="mr-2 text-purple-600 transition-all duration-300 group-hover:text-purple-400 group-hover:translate-x-1">
      <FaArrowRight />
    </span>
    {text}
  </div>
);

/* ------------------- contact item ------------------- */
const ContactItem = ({ icon, text, subtext }) => (
  <div className="flex items-start mt-4">
    <div className="text-purple-500 text-xl mr-3 p-2 rounded-lg shrink-0 bg-[#1F0C34] flex items-center justify-center h-10 w-10">
      {icon}
    </div>

    <div>
      <p className="text-gray-400 text-sm">{text}</p>
      {subtext && <p className="text-gray-400 text-sm">{subtext}</p>}
    </div>
  </div>
);

export default Footer;
