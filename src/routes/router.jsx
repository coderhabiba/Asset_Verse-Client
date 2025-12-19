import { createBrowserRouter } from 'react-router-dom'; 
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
    element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'join-employee',
        element: <EmployeeRegistration />,
      },
      {
        path: 'join-hr',
        element: <HrRegister />,
      },
      {
        path: 'login',
        element: <Login />,
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
        element: <UpgradePackage />,
      },
      {
        path: 'dashboard/upgrade/payment-cancelled',
        element: <UpgradePackage />,
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
            element: (
              <h2 className="text-2xl font-bold">Welcome to HR Dashboard!</h2>
            ),
          },
          { path: 'assets', element: <AssetList /> },
          { path: 'add-asset', element: <AddAsset /> },
          { path: 'requests', element: <ReqPage /> },
          { path: 'employees', element: <EmployeeList /> },
          { path: 'upgrade-package', element: <UpgradePackage /> },
          { path: 'upgrade', element: <UpgradePackage /> },
          { path: 'analytics', element: <Analytics /> },
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
              <h2 className="text-2xl font-bold">
                Welcome to employee's own Dashboard!
              </h2>
            ),
          },
          { path: 'my-assets', element: <MyAssets /> },
          { path: 'req-asset', element: <RequestAsset /> },
          { path: 'my-team', element: <MyTeam /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
]);
