import { ModeToggle } from '@/components/shared/ModeToggle.tsx';

const TopBar = () => {
  return (
    <header
      className={
        'dark:bg-dark-3 bg-light-2 w-screen flex items-center justify-center p-3 shadow-sm max-w-full'
      }
    >
      <nav className={'w-full flex items-center justify-between p-2'}>
        <div className={'text-[24px]'}>RSS-Test</div>
        <div>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
