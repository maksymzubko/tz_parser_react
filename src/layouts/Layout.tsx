import { Outlet } from 'react-router-dom';

const HeaderLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
