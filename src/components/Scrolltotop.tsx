import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const useScrollToTop = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Scroll to top on pathname or search params change
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);
};

export default useScrollToTop;
