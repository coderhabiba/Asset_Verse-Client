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


const SocialIcon = ({ icon }) => (
  <Link
    to="#"
    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 shadow-lg"
  >
    {icon}
  </Link>
);

const LinkItem = ({ text }) => (
  <div className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 cursor-pointer text-sm">
    <FaArrowRight className="mr-0 w-0 opacity-0 group-hover:mr-3 group-hover:w-3 group-hover:opacity-100 group-hover:text-purple-500 transition-all duration-300" />
    {text}
  </div>
);

const ContactItem = ({ icon, text, subtext }) => (
  <div className="group flex items-start p-3 rounded-2xl hover:bg-white/[0.02] transition-all duration-300">
    <div className="text-purple-500 text-xl mr-4 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-gray-300 text-sm font-medium leading-tight mt-1">
        {text}
      </span>
      {subtext && <span className="text-gray-500 text-xs mt-1">{subtext}</span>}
    </div>
  </div>
);

const FooterBottomLink = ({ text }) => (
  <Link className="text-gray-500 hover:text-purple-400 text-xs font-bold uppercase tracking-widest transition-colors">
    {text}
  </Link>
);

const Footer = () => {
  return (
    <footer className="relative bg-[#070B14] text-white pt-24 pb-12 overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative w-12 h-12 rounded-full bg-[#161B2B] p-1 overflow-hidden border border-white/10">
                  <img src={logo} alt="AssetVerse" className="w-full h-full object-contain" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter text-white">
                  ASSET<span className="text-purple-500">VERSE</span>
                </h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Management System</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
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

          
          <div>
            <h3 className="text-white font-bold mb-8 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-purple-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li><NavLink to="/"><LinkItem text="Home" /></NavLink></li>
              <li><NavLink to="/dashboard"><LinkItem text="Dashboard" /></NavLink></li>
              <li><NavLink to="/join-employee"><LinkItem text="Employee Portal" /></NavLink></li>
              <li><NavLink to="/join-hr"><LinkItem text="HR Manager" /></NavLink></li>
              <li><NavLink to="/login"><LinkItem text="Secure Login" /></NavLink></li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-white font-bold mb-8 relative inline-block">
              Solutions
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-pink-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li><LinkItem text="Asset Tracking" /></li>
              <li><LinkItem text="Inventory Hub" /></li>
              <li><LinkItem text="Lifecycle Insight" /></li>
              <li><LinkItem text="Team Analytics" /></li>
              <li><LinkItem text="Smart Reporting" /></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-bold mb-8 relative inline-block">
              Support
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h3>
            <div className="space-y-1">
              <ContactItem icon={<IoLocationOutline />} text="1/3 Business Street, Ixoth City" />
              <ContactItem icon={<IoCallOutline />} text="+1 (555) 123-4567" subtext="+1 (555) 987-6543" />
              <ContactItem icon={<IoMailOutline />} text="info@assetverse.com" />
              <ContactItem icon={<IoTimeOutline />} text="Mon-Fri: 9AM - 6PM" />
            </div>
          </div>
        </div>

  
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-medium">
            © 2025 <span className="text-gray-300">ASSETVERSE</span>. Empowering Teams Worldwide.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <FooterBottomLink text="Privacy" />
            <FooterBottomLink text="Terms" />
            <FooterBottomLink text="Cookies" />
            <FooterBottomLink text="Status" />
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;