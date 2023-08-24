import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SelectIsAuthorized } from '@/redux/store/user/selector.ts';
import { links } from '@/router.tsx';

const AdminLayout = () => {
  const isAuthorized = useSelector(SelectIsAuthorized);
  const location = useLocation();

  if (!isAuthorized && !location.pathname.includes('login')) return <Navigate to={links.login} replace={true} />;

  return <Outlet />;
};

export default AdminLayout;
