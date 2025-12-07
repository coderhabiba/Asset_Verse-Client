import { Outlet } from 'react-router';
import Navbar from './../utilities/Navbar/Navbar';
import Footer from './../utilities/Footer/Footer';

const RootLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-[90%] mx-auto">

      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;