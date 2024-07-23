'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import DashboardAdmin from '@/components/admin/dashboardAdmin/Dashboard';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = Cookies.get('admin-auth');
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  return <DashboardAdmin />;
};

export default AdminDashboard;
