import React from 'react';
import LoginForm from '@/components/forms/LoginForm.tsx';
import { useSelector } from 'react-redux';
import { SelectIsAuthorized } from '@/redux/store/user/selector.ts';
import { Navigate } from 'react-router-dom';
import { links } from '@/router.tsx';

const Login = () => {
  const isAuthorized = useSelector(SelectIsAuthorized);

  if (isAuthorized) return <Navigate to={links.dashboard} replace />;

  return (
    <div
      className={
        'fixed translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 w-full flex items-center justify-center'
      }>
      <LoginForm />
    </div>
  );
};

export default Login;
