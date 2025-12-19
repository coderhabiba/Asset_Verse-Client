import { Outlet } from 'react-router-dom';
import Navbar from './../utilities/Navbar/Navbar';
import Footer from './../utilities/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
  return (
    <div className="">
      <Toaster />
      <Navbar />
      <div className="mx-auto min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
