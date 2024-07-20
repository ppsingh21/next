import React from 'react';
import { useRouter } from 'next/router';
import { isAuthenticate, isAdmin } from './fetchApi';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const location = router.asPath;

  if (isAuthenticate() && !isAdmin()) {
    return <>{children}</>;
  } else {
    router.push({
      pathname: '/',
      query: { from: location },
    });
    return null;
  }
};

export default ProtectedRoute;
