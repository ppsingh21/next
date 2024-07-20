import React from 'react';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing Pran Motors content.',
};

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
