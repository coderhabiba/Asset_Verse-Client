import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from './../pages/Home/Home';
import EmployeeRegistration from '../pages/Authentication/Employee/EmployeeRegistration';
import HrRegister from '../pages/Authentication/HrRegister/HrRegister';
import Login from '../pages/Authentication/Login/Login';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HRDashboard from './../components/dashboard/HR/HRDashboard';
import EmployeeDashboard from './../components/dashboard/Employee/EmployeeDashboard';
import EmployeeRoute from './Employee/EmployeeRoute';
import HRRoute from './HR/HRRoute';
import AssetList from '../components/dashboard/HR/AssetList/AssetList';
import AddAsset from '../components/dashboard/HR/AddAsset/AddAsset';
import ReqPage from '../components/dashboard/HR/ReqPage/ReqPage';
import EmployeeList from '../components/dashboard/HR/EmployeeList/EmployeeList';
import UpgradePackage from '../components/dashboard/HR/UpgradePackage/UpgradePackage';
import Analytics from '../components/dashboard/HR/Analytics/Analytics';
import MyAssets from '../components/dashboard/Employee/MyAsset/MyAsset';
import RequestAsset from '../components/dashboard/Employee/RequestAsset/RequestAsset';
import MyTeam from '../components/dashboard/Employee/MyTeam/MyTeam';
import ProfilePage from '../components/dashboard/Employee/Profile/ProfilePage';
import HRProfileUpdate from '../components/dashboard/HR/Profile/HRProfileUpdate';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'join-employee',
        Component: EmployeeRegistration,
      },
      {
        path: 'join-hr',
        Component: HrRegister,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'hr-profile',
        element: (
          <HRRoute>
            <HRProfileUpdate />
          </HRRoute>
        ),
      },
      {
        path: 'dashboard/upgrade/payment-success',
        Component: UpgradePackage,
      },
      {
        path: 'dashboard/upgrade/payment-cancelled',
        Component: UpgradePackage,
      },

      {
        path: 'hr-dashboard',
        element: (
          <HRRoute>
            <HRDashboard />
          </HRRoute>
        ),
        children: [
          {
            index: true,
            element: <h2 className="text-2xl font-bold">Welcome to HR Dashboard!</h2>
          },
          {
            path: 'assets',
            Component: AssetList,
          },
          {
            path: 'add-asset',
            Component: AddAsset,
          },
          {
            path: 'requests',
            Component: ReqPage,
          },
          {
            path: 'employees',
            Component: EmployeeList,
          },
          {
            path: 'upgrade-package',
            Component: UpgradePackage,
          },
          {
            path: 'upgrade',
            Component: UpgradePackage,
          },
          {
            path: 'analytics',
            Component: Analytics,
          },
        ],
      },
      {
        path: 'employee-dashboard',
        element: (
          <EmployeeRoute>
            <EmployeeDashboard />
          </EmployeeRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <h2 className="text-2xl font-bold">Welcome to employee's own Dashboard!</h2>
            ),
          },
          {
            path: 'my-assets',
            Component: MyAssets,
          },
          {
            path: 'req-asset',
            Component: RequestAsset,
          },
          {
            path: 'my-team',
            Component: MyTeam,
          },
          {
            path: 'profile',
            Component: ProfilePage,
          },
        ],
      },
    ],
  },
]);
