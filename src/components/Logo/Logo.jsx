import { NavLink } from "react-router";
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <div>
      <NavLink to="/" className="flex items-center space-x-1">
        <div className="lg:w-12 w-10 lg:h-12 flex items-center justify-center rounded-full border border-purple-500">
          <img src={logo} alt="" />
        </div>
        <div>
          <p className="text-xs lg:text-lg font-extrabold text-primary tracking-wider">
            ASSETVERSE
          </p>
          <p className="lg:text-xs text-[6px] text-gray-400 lg:-mt-1">Asset Management System</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Logo;