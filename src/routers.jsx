import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomeIcon, UserIcon, InboxStackIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';

import LandingPageLayout from './layouts/LandingPageLayout';
import Home from './pages/landing_page/Home';
import About from './pages/landing_page/About';
import ContactUs from './pages/landing_page/ContactUs';

import AuthLayout from './layouts/AuthLayout';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

import PanelLayout from './layouts/PanelLayout';
import Dashboard from './pages/panel/Dashboard';
import Users from './pages/panel/Users';
import Products from './pages/panel/Products';
import Settings from './pages/panel/Settings';

import AllNotFound from './pages/not_found/AllNotFound';
import PanelNotFound from './pages/not_found/PanelNotFound';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/panel',
    element: <PanelLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: 'dashboard',
        title: 'Dashboard',
        icon: HomeIcon,
        element: <Dashboard />,
      },
      {
        path: 'users',
        title: 'Users',
        icon: UserIcon,
        element: <Users />,
      },
      {
        path: 'products',
        title: 'Products',
        icon: InboxStackIcon,
        children: [
          {
            path: 'list',
            title: 'List',
            element: <Products />,
          },
          {
            path: 'category',
            title: 'Category',
            element: <Products />,
          },
        ],
      },
      {
        path: 'settings',
        title: 'Settings',
        icon: Cog8ToothIcon,
        element: <Settings />,
      },
      {
        path: '*',
        element: <PanelNotFound />,
      },
    ],
  },
  {
    path: '*',
    element: <AllNotFound />,
  },
]);
export default routers;
