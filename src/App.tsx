import './App.css';
import { useRoutes } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { routes } from './router.tsx';
import { useDispatch } from 'react-redux';
import { setAuthorized } from '@/redux/store/user/slice.ts';
import Cookies from 'js-cookie';
import authApi from '@/api/auth/auth.api.ts';
import TopBar from '@/components/shared/TopBar.tsx';
import Footer from '@/components/shared/Footer.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';
import Loader from '@/components/ui/Loader.tsx';

function App() {
  const toTopBtn = useRef<HTMLButtonElement>();

  const [loading, setLoading] = useState(true);
  const route = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get('access_token_tz_demo');
    if (token) {
      authApi
        .verifyToken()
        .then(() => {
          dispatch(setAuthorized({ isAuthorized: true }));
        })
        .catch(() => {
          dispatch(setAuthorized({ isAuthorized: false }));
        })
        .finally(() => setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    const onScroll = () => {
      const btn = toTopBtn.current;
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.classList.remove('hidden');
      } else {
        btn.classList.add('hidden');
      }
    };

    onScroll();

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [toTopBtn]);

  function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={'dark:bg-dark-3 h-auto w-full text-black dark:text-light-1'}>
      <TopBar />
      {loading && (
        <span className={'fixed left-0 top-0 w-full h-full flex items-center justify-center'}>
          <Loader />
        </span>
      )}
      {!loading && route}
      <Button
        ref={toTopBtn}
        id="to-top-button"
        onClick={goToTop}
        className={
          '!fixed bottom-20 right-5 hidden rounded-full bg-red-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg'
        }
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          className="h-4 w-4"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
          ></path>
        </svg>
      </Button>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
