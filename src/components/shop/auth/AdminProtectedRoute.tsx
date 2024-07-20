import React from 'react';
import { useRouter } from 'next/router';
import { isAuthenticate, isAdmin } from './fetchApi';

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const location = router.asPath;

  if (isAdmin() && isAuthenticate()) {
    return <>{children}</>;
  } else {
    router.push({
      pathname: '/user/profile',
      query: { from: location },
    });
    return null;
  }
};

export default AdminProtectedRoute;
