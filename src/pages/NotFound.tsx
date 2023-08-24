import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { links } from '@/router.tsx';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className={
        'bg-light-2 dark:bg-dark-3 flex flex-col items-center justify-center w-full gap-4 h-full mt-20'
      }
    >
      <h3 className={'text-body-medium'}>Такої сторінки не існує!</h3>
      <Button className={'w-[250px] md:w-[300px]'} onClick={() => navigate(links.landing)}>
        Повернутись на головну
      </Button>
    </div>
  );
};

//

export default NotFound;
