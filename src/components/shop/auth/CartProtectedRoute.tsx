import React from 'react';
import { useRouter } from 'next/router';
import { isAuthenticate } from './fetchApi';

interface Props {
  children: React.ReactNode;
}

const CartProtectedRoute: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const location = router.asPath;

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length !== 0 && isAuthenticate()) {
    return <>{children}</>;
  } else {
    router.push({
      pathname: '/',
      query: { from: location },
    });
    return null;
  }
};

export default CartProtectedRoute;
