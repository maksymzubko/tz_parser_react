import { ModeToggle } from '@/components/ui/ModeToggle.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { links } from '@/router.tsx';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <header className={'dark:bg-dark-3 bg-light-2 w-screen flex items-center justify-center p-3 shadow-sm max-w-full'}>
      <nav className={'w-full flex items-center justify-between p-2'}>
        <div className={'text-[24px] cursor-pointer'} onClick={() => navigate(links.landing)}>
          RSS-Test
        </div>
        <div className={'flex gap-4 items-center'}>
          <Button className={'hidden md:flex'} onClick={() => navigate(links.dashboard)}>
            Dashboard
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
