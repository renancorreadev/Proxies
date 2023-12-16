import { lazy } from 'react';
import { PrivateRoute } from '../pages/Authentication/PrivateRouter';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const Login = lazy(() => import('../pages/Authentication/Login'));
const Logout = lazy(() => import('../pages/Authentication/Logout'));
const Callback = lazy(() => import('../pages/Authentication/Callback'));
const PrivateRoute = lazy(() => import('../pages/Authentication/PrivateRouter'));



const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/login',
    title: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    title: 'Logout',
    component: Logout,
  },
  {
    path: '/callback',
    title: 'Callback',
    component: Callback,
  },
  {
    path: '/admin',
    title: 'Admin',
    component: PrivateRoute,
  },
];

const routes = [...coreRoutes];
export default routes;
