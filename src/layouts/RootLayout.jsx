import { Outlet } from 'react-router';
import Navbar from './../utilities/Navbar/Navbar';
import Footer from './../utilities/Footer/Footer';
import { Toaster } from './../../node_modules/react-hot-toast/src/components/toaster';

const RootLayout = () => {
  return (
    <div className="">
      <Toaster />
      <Navbar />
      <div className="mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
