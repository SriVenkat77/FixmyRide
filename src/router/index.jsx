import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from '../components/ErrorPage';
import ProtectedRoute from '../components/ProtectedRoute';
import BaseLayout from '../layouts/BaseLayout';

import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Profile from '../pages/ProfilePage';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const AddService = lazy(() => import('../pages/AddService'));
const EditService = lazy(() => import('../pages/EditService'));
const ServiceDetails = lazy(() => import('../pages/ServiceDetails'));
const Bookings = lazy(() => import('../pages/Bookings'));

const withSuspense = (Component) => (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-lg font-semibold">Loading...</div>}>
        {Component}
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <BaseLayout>
                <Home />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/sign-up',
        element: (
            <BaseLayout>
                <SignUp />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: (
            <BaseLayout>
                <LogIn />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/profile',
        element: (
            <BaseLayout>
                <Profile />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/dashboard',
        element: withSuspense(
            <BaseLayout>
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/dashboard/add',
        element: withSuspense(
            <BaseLayout>
                <AddService />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/dashboard/bookings',
        element: withSuspense(
            <BaseLayout>
                <Bookings />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/dashboard/service-details/:id',
        element: withSuspense(
            <BaseLayout>
                <ServiceDetails />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/dashboard/edit/:id',
        element: withSuspense(
            <BaseLayout>
                <EditService />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
],

{
    future: {
      v7_relativeSplatPath: true,
    },
  }

);
