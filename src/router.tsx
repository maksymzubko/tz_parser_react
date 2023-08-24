import { lazy, Suspense } from 'react';
import SuspenseLoader from './components/shared/SuspenseLoader.tsx';
import { Navigate } from 'react-router-dom';

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Landing = Loader(lazy(() => import('./pages/Landing.tsx')));

const Article = Loader(lazy(() => import('./pages/Article.tsx')));

const NotFound = Loader(lazy(() => import('./pages/NotFound.tsx')));

const AdminLanding = Loader(lazy(() => import('./pages/AdminLanding.tsx')));

const Login = Loader(lazy(() => import('./pages/Login.tsx')));

const AdminLayout = Loader(lazy(() => import('./layouts/Layout.tsx')));

console.log(typeof AdminLanding, 'type');
export const links = {
  landing: '/',
  article: '/article/',
  dashboard: '/admin/dashboard',
  login: '/admin/login',
  notFound: 'page-404'
};

export const routes = [
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/article/:id',
    element: <Article />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/login',
        element: <Login />
      },
      {
        path: '/admin/dashboard',
        element: <AdminLanding />
      },
      {
        path: '*',
        element: <Navigate to={links.dashboard} />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to={links.notFound} />
  },
  {
    path: 'page-404',
    element: <NotFound />
  }
];
