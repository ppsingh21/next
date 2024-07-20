import React, { Fragment } from 'react';
import OrderMenu from './OrderMenu';
import AllOrders from './AllOrders';
import { OrderProvider } from './OrderContext';
import AdminLayout from '../layout/AdminLayout';

const OrderComponent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <OrderMenu />
      <AllOrders />
    </div>
  );
};

const Orders: React.FC = () => {
  return (
    <Fragment>
      <OrderProvider>
        <AdminLayout>
          <OrderComponent />
        </AdminLayout>
      </OrderProvider>
    </Fragment>
  );
};

export default Orders;
