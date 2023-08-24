import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import Loader from '@/components/ui/Loader.tsx';

function SuspenseLoader() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className={'fixed left-0 top-0 w-full h-full flex items-center justify-center'}>
      <Loader />
    </div>
  );
}

export default SuspenseLoader;
