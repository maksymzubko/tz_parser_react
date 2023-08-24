import { lazy, Suspense } from 'react';
import SuspenseLoader from './components/shared/SuspenseLoader.tsx';

const Loader = (Component: any) => (props: any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Landing = Loader(lazy(() => import('./pages/Landing.tsx')));

const Article = Loader(lazy(() => import('./pages/Article.tsx')));

export const links = {
  landing: '/',
  article: '/article/'
};

export const routes = {
  authorized: [
    {
      path: '/',
      element: <Landing />
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
    }
  ]
};
