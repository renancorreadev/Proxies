
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthProvider';
import { Login } from './pages/Authentication/Login';
import { Logout } from './pages/Authentication/Logout';
import { PrivateRoute } from './pages/Authentication/PrivateRouter';
import { Callback } from './pages/Authentication/Callback';

import DefaultLayout from './layout/DefaultLayout';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Tables';

import Chart from './pages/Chart';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import ECommerce from './pages/Dashboard/ECommerce';

import { CustomerList } from './pages/Customer/CustomerList';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <DefaultLayout />
        </PrivateRoute>
      ),
      children: [
        { path: "/", element: <ECommerce /> },
        { path: "calendar", element: <Calendar /> },
        { path: "profile", element: <Profile /> },
        { path: "forms/form-elements", element: <FormElements /> },
        { path: "forms/form-layout", element: <FormLayout /> },
        { path: "tables", element: <Tables /> },
        { path: "settings", element: <Settings /> },
        { path: "chart", element: <Chart /> },
        { path: "ui/alerts", element: <Alerts /> },
        { path: "ui/buttons", element: <Buttons /> },
        { path: "customers/list", element: <CustomerList /> },
      ],
    },
    // Rotas de autenticação separadas
    { path: "login", element: <Login /> },
    { path: "logout", element: <Logout /> },
    { path: "callback", element: <Callback /> },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </AuthProvider>
  );

}

export default App;