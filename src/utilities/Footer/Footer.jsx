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
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const SocialIcon = ({ icon, to = '#' }) => (
  <Link
    to={to}
    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-200/50 dark:bg-white/5 border border-gray-300 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-purple-500/20"
  >
    {icon}
  </Link>
);

const LinkItem = ({ text, to }) => (
  <NavLink
    to={to}
    className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-all duration-300 cursor-pointer text-sm font-medium"
  >
    <FaArrowRight className="mr-0 w-0 opacity-0 group-hover:mr-3 group-hover:w-3 group-hover:opacity-100 group-hover:text-purple-500 transition-all duration-300" />
    {text}
  </NavLink>
);

const ContactItem = ({ icon, text }) => (
  <div className="group flex items-start p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all duration-300">
    <div className="text-purple-500 text-xl mr-4 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium leading-tight mt-2.5 text-gray-700 dark:text-gray-300">
        {text}
      </span>
    </div>
  </div>
);

const FooterBottomLink = ({ text, to = '#' }) => (
  <Link
    to={to}
    className="text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 text-xs font-bold uppercase tracking-widest transition-colors"
  >
    {text}
  </Link>
);

const Footer = () => {
  const { user } = useContext(AuthContext);
  const isHR = user?.role === 'hr';

  const dashboardPath = user
    ? isHR
      ? '/hr-dashboard'
      : '/employee-dashboard'
    : '/login';

  return (
    <footer className="relative bg-white dark:bg-black/20 backdrop-blur-md pt-24 pb-12 overflow-hidden border-t border-gray-200 dark:border-white/5">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Optimizing asset lifecycles and operational efficiency through
              intelligent tracking and advanced cloud technology.
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaLinkedinIn />} />
              <SocialIcon icon={<FaInstagram />} />
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-8 relative inline-block text-gray-900 dark:text-white">
              Company
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-purple-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <LinkItem to="/" text="Home" />
              </li>
              <li>
                <LinkItem to={dashboardPath} text="Main Dashboard" />
              </li>
              <li>
                <LinkItem to="/join-employee" text="Employee Portal" />
              </li>
              <li>
                <LinkItem to="/join-hr" text="HR Manager" />
              </li>
              <li>
                <LinkItem to="/login" text="Secure Login" />
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-bold mb-8 relative inline-block text-gray-900 dark:text-white">
              Solutions
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-pink-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {isHR ? (
                <>
                  <li>
                    <LinkItem to="/hr-dashboard/assets" text="Asset Tracking" />
                  </li>
                  <li>
                    <LinkItem
                      to="/hr-dashboard/add-asset"
                      text="Inventory Hub"
                    />
                  </li>
                  <li>
                    <LinkItem
                      to="/hr-dashboard/employees"
                      text="Team Management"
                    />
                  </li>
                  <li>
                    <LinkItem to="/hr-dashboard/analytics" text="Analytics" />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <LinkItem
                      to="/employee-dashboard/my-assets"
                      text="My Assets"
                    />
                  </li>
                  <li>
                    <LinkItem
                      to="/employee-dashboard/req-asset"
                      text="Request Hub"
                    />
                  </li>
                  <li>
                    <LinkItem
                      to="/employee-dashboard/my-team"
                      text="Team Insight"
                    />
                  </li>
                  <li>
                    <LinkItem
                      to="/employee-dashboard/profile"
                      text="User Settings"
                    />
                  </li>
                </>
              )}
              <li>
                <LinkItem
                  to={isHR ? '/hr-dashboard/upgrade' : '/'}
                  text="Smart Reporting"
                />
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-8 relative inline-block text-gray-900 dark:text-white">
              Support
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h3>
            <div className="space-y-2">
              <ContactItem
                icon={<IoLocationOutline />}
                text="1/3 Business Street, Ixoth City"
              />
              <ContactItem
                icon={<IoCallOutline />}
                text="+088 0177 909 89 06"
              />
              <ContactItem
                icon={<IoMailOutline />}
                text="info@assetverse.com"
              />
              <ContactItem icon={<IoTimeOutline />} text="Mon-Fri: 9AM - 6PM" />
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 dark:text-gray-500 text-xs font-medium text-center md:text-left">
            © 2026{' '}
            <span className="text-purple-600 dark:text-purple-500 font-bold">
              ASSETVERSE
            </span>
            . Empowering Teams Worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <FooterBottomLink text="Privacy" to="/privacy" />
            <FooterBottomLink text="Terms" to="/terms" />
            <FooterBottomLink text="Cookies" to="/cookies" />
            <FooterBottomLink text="Status" to="/status" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
