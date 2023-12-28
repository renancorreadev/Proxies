import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthProvider';
import DefaultLayout from './layout/DefaultLayout';
import { Callback } from './pages/Authentication/Callback';
import { Login } from './pages/Authentication/Login';
import { Logout } from './pages/Authentication/Logout';
import { PrivateRoute } from './pages/Authentication/PrivateRouter';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import { CustomerAdd } from './pages/Customer/CustomerAdd';
import { CustomerList } from './pages/Customer/CustomerList';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import { AddPointPage } from './pages/Points/AddPointPage';
import { PointsViewPage } from './pages/Points/PointsViewPage';
import { RemovePointsPage } from './pages/Points/RemovePointPage';
import Profile from './pages/Profile';
import { RewardsPage } from './pages/RewardsPage';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PrivateRoute>
          <DefaultLayout />
        </PrivateRoute>
      ),

      children: [
        { path: '/', element: <ECommerce /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'profile', element: <Profile /> },
        { path: 'forms/form-elements', element: <FormElements /> },
        { path: 'forms/form-layout', element: <FormLayout /> },
        { path: 'tables', element: <Tables /> },
        { path: 'settings', element: <Settings /> },
        { path: 'chart', element: <Chart /> },
        { path: 'ui/alerts', element: <Alerts /> },
        { path: 'ui/buttons', element: <Buttons /> },
        { path: 'customers/list', element: <CustomerList /> },
        { path: 'customers/add', element: <CustomerAdd /> },
        { path: 'points/view', element: <PointsViewPage /> },
        { path: 'points/add', element: <AddPointPage /> },
        { path: 'points/remove', element: <RemovePointsPage /> },
        { path: 'rewards', element: <RewardsPage /> },
      ],
    },
    // Rotas de autenticação separadas
    { path: 'login', element: <Login /> },
    { path: 'logout', element: <Logout /> },
    { path: 'callback', element: <Callback /> },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </AuthProvider>
  );
}

export default App;
