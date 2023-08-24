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

export const links = {
  landing: '/',
  article: '/article/',
  dashboard: 'dashboard',
  notFound: 'page-404'
};

export const routes = {
  authorized: [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ],
  'not-authorized': [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/article/:id',
      element: <Article />
    },
    {
      path: '*',
      element: <Navigate to={links.notFound} />
    },
    {
      path: 'page-404',
      element: <NotFound />
    }
  ]
};
