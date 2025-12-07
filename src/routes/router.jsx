import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from './../pages/Home/Home';
import EmployeeRegistration from '../pages/Authentication/Employee/EmployeeRegistration';
import HrRegister from '../pages/Authentication/HrRegister/HrRegister';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'join-employee',
        Component: EmployeeRegistration
      },
      {
        path: 'join-hr',
        Component: HrRegister
      }
    ],
  },
]);
